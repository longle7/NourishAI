import { useEffect, useState } from 'react';
import { getNutritionSummary } from '../services/nutritionService';

interface Meal {
  id: string;
  mealName: string;
  notes: string;
  calories: number;
  itemCount: number;
}

interface Summary {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  goalCalories: number;
  goalProtein: number;
  goalCarbs: number;
  goalFat: number;
  meals: Meal[];
}

const MacroBar = ({ label, value, goal, color }: {
  label: string; value: number; goal: number; color: string;
}) => {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#666' }}>{value}g / {goal}g</span>
      </div>
      <div style={{ background: '#eee', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '10px',
          background: color, borderRadius: '999px',
          transition: 'width 0.6s ease'
        }} />
      </div>
      <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{pct}% of goal</div>
    </div>
  );
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getNutritionSummary()
      .then(setSummary)
      .catch(() => setError('Failed to load summary.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Loading dashboard...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;
  if (!summary) return null;

  const calPct = Math.min(100, Math.round((summary.totalCalories / summary.goalCalories) * 100));

  return (
    <div style={{ maxWidth: '720px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Today Nutrition</h1>

      <div style={{
        background: '#f9f9f9', border: '1px solid #ddd',
        borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', fontWeight: 700 }}>{Number(summary.totalCalories).toFixed(0)}</div>
        <div style={{ color: '#666', marginBottom: '1rem' }}>of {summary.goalCalories} kcal goal</div>
        <div style={{ background: '#eee', borderRadius: '999px', height: '14px', overflow: 'hidden' }}>
          <div style={{
            width: `${calPct}%`, height: '14px',
            background: '#2a9d8f', borderRadius: '999px',
            transition: 'width 0.8s ease'
          }} />
        </div>
        <div style={{ color: '#888', marginTop: '0.5rem' }}>{calPct}% of daily goal</div>
      </div>

      <div style={{
        background: '#f9f9f9', border: '1px solid #ddd',
        borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Macros</h2>
        <MacroBar label="Protein" value={Number(summary.totalProtein)} goal={summary.goalProtein} color="#4caf50" />
        <MacroBar label="Carbs"   value={Number(summary.totalCarbs)}   goal={summary.goalCarbs}   color="#ff9800" />
        <MacroBar label="Fat"     value={Number(summary.totalFat)}     goal={summary.goalFat}     color="#2196f3" />
      </div>

      <div style={{
        background: '#f9f9f9', border: '1px solid #ddd',
        borderRadius: '12px', padding: '1.5rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Meals Logged Today</h2>
        {summary.meals.length === 0 ? (
          <p style={{ color: '#999' }}>No meals logged yet.</p>
        ) : (
          summary.meals.map(meal => (
            <div key={meal.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.75rem 0', borderBottom: '1px solid #eee'
            }}>
              <div>
                <strong>{meal.mealName}</strong>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {meal.itemCount} item{meal.itemCount !== 1 ? 's' : ''} - {meal.notes}
                </div>
              </div>
              <div style={{ fontWeight: 600 }}>{Number(meal.calories).toFixed(0)} kcal</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}