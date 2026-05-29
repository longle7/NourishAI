import api from './api';

export interface MealItem {
    id: string;
    foodName: string;
    servingUnit: string;
    servingQty: number;
    caloriesKcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    aiGenerated: boolean;
    userEdited: boolean;
}

export interface Meal {
    id: string;
    loggedAt: string;
    notes: string;
    photoUrl: string | null;
    items: MealItem[];
}

export interface CreateMealRequest {
    loggedAt: string;
    notes: string;
}

export interface CreateMealItemRequest {
    foodName: string;
    servingUnit: string;
    servingQty: number;
    caloriesKcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    aiGenerated: boolean;
}

export const getMeals = async (): Promise<Meal[]> => {
    const response = await api.get<Meal[]>('/meals');
    return response.data;
};

export const createMeal = async (data: CreateMealRequest): Promise<Meal> => {
    const response = await api.post<Meal>('/meals', data);
    return response.data;
};

export const deleteMeal = async (mealId: string): Promise<void> => {
    await api.delete(`/meals/${mealId}`);
};

export const addMealItem = async (mealId: string, data: CreateMealItemRequest): Promise<MealItem> => {
    const response = await api.post<MealItem>(`/meals/${mealId}/items`, data);
    return response.data;
};

export const deleteMealItem = async (mealId: string, itemId: string): Promise<void> => {
    await api.delete(`/meals/${mealId}/items/${itemId}`);
};