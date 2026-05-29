namespace NourishAI.Core.DTOs;

public class MealResponse
{
    public Guid Id { get; set; }
    public DateTime LoggedAt { get; set; }
    public string? Notes { get; set; }
    public string? PhotoUrl { get; set; }
    public List<MealItemResponse> Items { get; set; } = new();
}

public class MealItemResponse
{
    public Guid Id { get; set; }
    public string FoodName { get; set; } = string.Empty;
    public string ServingUnit { get; set; } = string.Empty;
    public decimal ServingQty { get; set; }
    public decimal CaloriesKcal { get; set; }
    public decimal ProteinG { get; set; }
    public decimal CarbsG { get; set; }
    public decimal FatG { get; set; }
    public bool AiGenerated { get; set; }
    public bool UserEdited { get; set; }
}