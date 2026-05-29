using NourishAI.Core.DTOs;

namespace NourishAI.Core.Interfaces;

public interface IMealService
{
    Task<List<MealResponse>> GetMealsByDateAsync(Guid userId, DateOnly date);
    Task<MealResponse> CreateMealAsync(Guid userId, CreateMealRequest request);
    Task<MealItemResponse> AddMealItemAsync(Guid mealId, CreateMealItemRequest request);
    Task<bool> DeleteMealAsync(Guid mealId, Guid userId);
    Task<bool> DeleteMealItemAsync(Guid itemId, Guid mealId);
}