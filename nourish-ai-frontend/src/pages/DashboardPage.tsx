import { useEffect, useState } from 'react';
import { getMeals, createMeal, deleteMeal, addMealItem, deleteMealItem } from '../services/mealService';
import type { Meal } from '../services/mealService';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        try {
            const data = await getMeals();
            setMeals(data);
        } catch {
            navigate('/login');
        }
    };

    const handleCreateMeal = async () => {
        if (!notes) return;
        await createMeal({ loggedAt: new Date().toISOString(), notes });
        setNotes('');
        fetchMeals();
    };

    const handleDeleteMeal = async (mealId: string) => {
        await deleteMeal(mealId);
        fetchMeals();
    };

    const handleAddItem = async (mealId: string) => {
        await addMealItem(mealId, {
            foodName: 'Sample Food',
            servingUnit: 'g',
            servingQty: 100,
            caloriesKcal: 200,
            proteinG: 10,
            carbsG: 20,
            fatG: 5,
            aiGenerated: false,
        });
        fetchMeals();
    };

    const handleDeleteItem = async (mealId: string, itemId: string) => {
        await deleteMealItem(mealId, itemId);
        fetchMeals();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>My Meals</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div style={{ marginBottom: 24 }}>
                <input
                    placeholder="Meal notes (e.g. Breakfast)"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    style={{ marginRight: 8, width: 300 }}
                />
                <button onClick={handleCreateMeal}>Add Meal</button>
            </div>

            {meals.map(meal => (
                <div key={meal.id} style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>{meal.notes}</h3>
                        <button onClick={() => handleDeleteMeal(meal.id)} style={{ color: 'red' }}>Delete Meal</button>
                    </div>
                    <p style={{ color: '#666' }}>{new Date(meal.loggedAt).toLocaleString()}</p>

                    {meal.items.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #eee' }}>
                            <span>{item.foodName} — {item.caloriesKcal} kcal | P: {item.proteinG}g | C: {item.carbsG}g | F: {item.fatG}g</span>
                            <button onClick={() => handleDeleteItem(meal.id, item.id)} style={{ color: 'red' }}>Remove</button>
                        </div>
                    ))}

                    <button onClick={() => handleAddItem(meal.id)} style={{ marginTop: 8 }}>+ Add Item</button>
                </div>
            ))}

            {meals.length === 0 && <p>No meals logged yet. Add your first meal above!</p>}
        </div>
    );
} 