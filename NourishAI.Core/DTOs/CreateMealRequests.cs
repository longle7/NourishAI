namespace NourishAI.Core.DTOs;

public class CreateMealRequest
{
    public string MealName { get; set; } = "Meal";
    public DateTime LoggedAt { get; set; } = DateTime.UtcNow;
    public string? Notes { get; set; }
}