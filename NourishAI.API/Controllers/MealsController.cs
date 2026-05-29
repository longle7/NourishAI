using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NourishAI.Core.DTOs;
using NourishAI.Core.Interfaces;
using System.Security.Claims;

namespace NourishAI.API.Controllers;

[ApiController]
[Route("api/meals")]
[Authorize]
public class MealsController : ControllerBase
{
    private readonly IMealService _mealService;

    public MealsController(IMealService mealService)
    {
        _mealService = mealService;
    }

    private Guid GetUserId() =>
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetMeals([FromQuery] DateOnly? date)
    {
        var targetDate = date ?? DateOnly.FromDateTime(DateTime.UtcNow);
        var meals = await _mealService.GetMealsByDateAsync(GetUserId(), targetDate);
        return Ok(meals);
    }

    [HttpPost]
    public async Task<IActionResult> CreateMeal(CreateMealRequest request)
    {
        var meal = await _mealService.CreateMealAsync(GetUserId(), request);
        return CreatedAtAction(nameof(GetMeals), meal);
    }

    [HttpDelete("{mealId}")]
    public async Task<IActionResult> DeleteMeal(Guid mealId)
    {
        var success = await _mealService.DeleteMealAsync(mealId, GetUserId());
        return success ? NoContent() : NotFound();
    }

    [HttpPost("{mealId}/items")]
    public async Task<IActionResult> AddMealItem(Guid mealId, CreateMealItemRequest request)
    {
        var item = await _mealService.AddMealItemAsync(mealId, request);
        return CreatedAtAction(nameof(GetMeals), item);
    }

    [HttpDelete("{mealId}/items/{itemId}")]
    public async Task<IActionResult> DeleteMealItem(Guid mealId, Guid itemId)
    {
        var success = await _mealService.DeleteMealItemAsync(itemId, mealId);
        return success ? NoContent() : NotFound();
    }
}