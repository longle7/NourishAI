using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NourishAI.Infrastructure.Data;
using System.Security.Claims;

namespace NourishAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NutritionController : ControllerBase
{
    private readonly AppDbContext _context;

    public NutritionController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetDailySummary()
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.Parse(userIdString!);
        var today = DateTime.UtcNow.Date;

        var meals = await _context.Meals
            .Include(m => m.Items)
            .Where(m => m.UserId == userId && m.CreatedAt.Date == today)
            .ToListAsync();

        var summary = new
        {
            TotalCalories = meals.SelectMany(m => m.Items).Sum(i => i.CaloriesKcal),
            TotalProtein = meals.SelectMany(m => m.Items).Sum(i => i.ProteinG),
            TotalCarbs = meals.SelectMany(m => m.Items).Sum(i => i.CarbsG),
            TotalFat = meals.SelectMany(m => m.Items).Sum(i => i.FatG),
            GoalCalories = 2000,
            GoalProtein = 150,
            GoalCarbs = 250,
            GoalFat = 65,
            Meals = meals.Select(m => new
            {
                m.Id,
                m.MealName,
                Notes = m.Notes ?? "No notes",
                Calories = m.Items.Sum(i => i.CaloriesKcal),
                ItemCount = m.Items.Count
            })
        };

        return Ok(summary);
    }
}