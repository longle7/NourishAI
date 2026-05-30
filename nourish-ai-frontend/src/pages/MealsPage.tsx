import { useEffect, useState } from 'react';
import {
    getMeals,
    createMeal,
    deleteMeal,
    addMealItem,
    deleteMealItem
} from '../services/mealService';

import type { Meal, CreateMealItemRequest } from '../services/mealService';

export default function MealsPage() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [newMealName, setNewMealName] = useState('');
    const [showAddItem, setShowAddItem] = useState<string | null>(null);
    const [itemForm, setItemForm] = useState<CreateMealItemRequest>({
        foodName: '',
        servingUnit: 'g',
        servingQty: 100,
        caloriesKcal: 0,
        proteinG: 0,
        carbsG: 0,
        fatG: 0,
        aiGenerated: false
    });

    useEffect(() => {
        loadMeals();
    }, []);

    const loadMeals = async () => {
        try {
            const data = await getMeals();
            setMeals(data);
        } catch (err) {
            console.error('Failed to load meals', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMeal = async () => {
        if (!newMealName.trim()) return;
        try {
            const meal = await createMeal({
                mealName: newMealName.trim(),
                loggedAt: new Date().toISOString(),
                notes: ''
            });
            setMeals([...meals, meal]);
            setNewMealName('');
        } catch (err) {
            console.error('Failed to create meal', err);
        }
    };

    const handleDeleteMeal = async (mealId: string) => {
        try {
            await deleteMeal(mealId);
            setMeals(meals.filter(m => m.id !== mealId));
        } catch (err) {
            console.error('Failed to delete meal', err);
        }
    };

    const handleAddItem = async (mealId: string) => {
        if (!itemForm.foodName.trim()) return;
        try {
            const item = await addMealItem(mealId, itemForm);
            setMeals(meals.map(m =>
                m.id === mealId ? { ...m, items: [...m.items, item] } : m
            ));
            setShowAddItem(null);
            setItemForm({
                foodName: '',
                servingUnit: 'g',
                servingQty: 100,
                caloriesKcal: 0,
                proteinG: 0,
                carbsG: 0,
                fatG: 0,
                aiGenerated: false
            });
        } catch (err) {
            console.error('Failed to add item', err);
        }
    };

    const handleDeleteItem = async (mealId: string, itemId: string) => {
        try {
            await deleteMealItem(mealId, itemId);
            setMeals(meals.map(m =>
                m.id === mealId
                    ? { ...m, items: m.items.filter(i => i.id !== itemId) }
                    : m
            ));
        } catch (err) {
            console.error('Failed to delete item', err);
        }
    };

    if (loading) return <p style={{ padding: '2rem' }}>Loading meals...</p>;

    return (
        <div style={{ maxWidth: '720px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>Meals</h1>

            {/* Add Meal */}
            <div style={{
                display: 'flex', gap: '0.5rem',
                marginBottom: '2rem'
            }}>
                <input
                    value={newMealName}
                    onChange={e => setNewMealName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCreateMeal()}
                    placeholder="Meal name (e.g. Breakfast)"
                    style={{
                        flex: 1, padding: '0.5rem 0.75rem',
                        border: '1px solid #ddd', borderRadius: '8px',
                        fontSize: '14px'
                    }}
                />
                <button
                    onClick={handleCreateMeal}
                    style={{
                        padding: '0.5rem 1rem', background: '#2a9d8f',
                        color: '#fff', border: 'none', borderRadius: '8px',
                        cursor: 'pointer', fontWeight: 600
                    }}
                >
                    Add Meal
                </button>
            </div>

            {/* Meals List */}
            {meals.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
                    No meals logged today. Add your first meal above.
                </p>
            ) : (
                meals.map(meal => (
                    <div key={meal.id} style={{
                        background: '#f9f9f9', border: '1px solid #ddd',
                        borderRadius: '12px', padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        {/* Meal Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <h2 style={{ fontSize: '16px', margin: 0 }}>{meal.mealName}</h2>
                            <button
                                onClick={() => handleDeleteMeal(meal.id)}
                                style={{
                                    background: 'none', border: 'none',
                                    color: '#e74c3c', cursor: 'pointer',
                                    fontSize: '13px'
                                }}
                            >
                                Delete Meal
                            </button>
                        </div>

                        {/* Items */}
                        {meal.items.length === 0 ? (
                            <p style={{ color: '#aaa', fontSize: '13px' }}>No items yet.</p>
                        ) : (
                            meal.items.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', padding: '0.4rem 0',
                                    borderBottom: '1px solid #eee', fontSize: '14px'
                                }}>
                                    <div>
                                        <strong>{item.foodName}</strong>
                                        <span style={{ color: '#999', marginLeft: '0.5rem' }}>
                                            {item.servingQty}{item.servingUnit}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span>{item.caloriesKcal} kcal</span>
                                        <button
                                            onClick={() => handleDeleteItem(meal.id, item.id)}
                                            style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Add Item */}
                        {showAddItem === meal.id ? (
                            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <input placeholder="Food name" value={itemForm.foodName}
                                    onChange={e => setItemForm({ ...itemForm, foodName: e.target.value })}
                                    style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <input placeholder="Serving qty" type="number" value={itemForm.servingQty}
                                        onChange={e => setItemForm({ ...itemForm, servingQty: Number(e.target.value) })}
                                        style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                    <input placeholder="Unit (g, ml, oz)" value={itemForm.servingUnit}
                                        onChange={e => setItemForm({ ...itemForm, servingUnit: e.target.value })}
                                        style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                    <input placeholder="Calories" type="number" value={itemForm.caloriesKcal}
                                        onChange={e => setItemForm({ ...itemForm, caloriesKcal: Number(e.target.value) })}
                                        style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                    <input placeholder="Protein (g)" type="number" value={itemForm.proteinG}
                                        onChange={e => setItemForm({ ...itemForm, proteinG: Number(e.target.value) })}
                                        style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                    <input placeholder="Carbs (g)" type="number" value={itemForm.carbsG}
                                        onChange={e => setItemForm({ ...itemForm, carbsG: Number(e.target.value) })}
                                        style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                    <input placeholder="Fat (g)" type="number" value={itemForm.fatG}
                                        onChange={e => setItemForm({ ...itemForm, fatG: Number(e.target.value) })}
                                        style={{ padding: '0.4rem', border: '1px solid #ddd', borderRadius: '6px' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleAddItem(meal.id)}
                                        style={{ padding: '0.4rem 1rem', background: '#2a9d8f', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                        Save Item
                                    </button>
                                    <button onClick={() => setShowAddItem(null)}
                                        style={{ padding: '0.4rem 1rem', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setShowAddItem(meal.id)}
                                style={{
                                    marginTop: '0.75rem', padding: '0.4rem 0.75rem',
                                    background: 'none', border: '1px dashed #ccc',
                                    borderRadius: '6px', cursor: 'pointer',
                                    color: '#888', fontSize: '13px'
                                }}>
                                + Add Item
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}