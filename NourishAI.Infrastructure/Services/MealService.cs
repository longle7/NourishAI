using Microsoft.EntityFrameworkCore;
using NourishAI.Core.DTOs;
using NourishAI.Core.Interfaces;
using NourishAI.Core.Models;
using NourishAI.Infrastructure.Data;

namespace NourishAI.Infrastructure.Services;

public class MealService : IMealService
{
    private readonly AppDbContext _context;

    public MealService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<MealResponse>> GetMealsByDateAsync(Guid userId, DateOnly date)
    {
        var meals = await _context.Meals
            .Include(m => m.Items)
            .Where(m => m.UserId == userId &&
                        DateOnly.FromDateTime(m.LoggedAt) == date)
            .OrderBy(m => m.LoggedAt)
            .ToListAsync();

        return meals.Select(MapToResponse).ToList();
    }

    public async Task<MealResponse> CreateMealAsync(Guid userId, CreateMealRequest request)
    {
        var meal = new Meal
        {
            UserId = userId,
            LoggedAt = request.LoggedAt,
            Notes = request.Notes
        };

        _context.Meals.Add(meal);
        await _context.SaveChangesAsync();

        return MapToResponse(meal);
    }

    public async Task<MealItemResponse> AddMealItemAsync(Guid mealId, CreateMealItemRequest request)
    {
        var item = new MealItem
        {
            MealId = mealId,
            FoodName = request.FoodName,
            ServingUnit = request.ServingUnit,
            ServingQty = request.ServingQty,
            CaloriesKcal = request.CaloriesKcal,
            ProteinG = request.ProteinG,
            CarbsG = request.CarbsG,
            FatG = request.FatG,
            UsdaFdcId = request.UsdaFdcId,
            AiGenerated = request.AiGenerated
        };

        _context.MealItems.Add(item);
        await _context.SaveChangesAsync();

        return MapItemToResponse(item);
    }

    public async Task<bool> DeleteMealAsync(Guid mealId, Guid userId)
    {
        var meal = await _context.Meals
            .FirstOrDefaultAsync(m => m.Id == mealId && m.UserId == userId);

        if (meal == null) return false;

        _context.Meals.Remove(meal);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteMealItemAsync(Guid itemId, Guid mealId)
    {
        var item = await _context.MealItems
            .FirstOrDefaultAsync(i => i.Id == itemId && i.MealId == mealId);

        if (item == null) return false;

        _context.MealItems.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }

    private static MealResponse MapToResponse(Meal meal) => new()
    {
        Id = meal.Id,
        LoggedAt = meal.LoggedAt,
        Notes = meal.Notes,
        PhotoUrl = meal.PhotoUrl,
        Items = meal.Items.Select(MapItemToResponse).ToList()
    };

    private static MealItemResponse MapItemToResponse(MealItem item) => new()
    {
        Id = item.Id,
        FoodName = item.FoodName,
        ServingUnit = item.ServingUnit,
        ServingQty = item.ServingQty,
        CaloriesKcal = item.CaloriesKcal,
        ProteinG = item.ProteinG,
        CarbsG = item.CarbsG,
        FatG = item.FatG,
        AiGenerated = item.AiGenerated,
        UserEdited = item.UserEdited
    };
}