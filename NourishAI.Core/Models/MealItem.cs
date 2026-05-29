namespace NourishAI.Core.Models;

public class MealItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MealId { get; set; }
    public Meal Meal { get; set; } = null!;
    public string FoodName { get; set; } = string.Empty;
    public int? UsdaFdcId { get; set; }
    public string ServingUnit { get; set; } = "g";
    public decimal ServingQty { get; set; }
    public decimal CaloriesKcal { get; set; }
    public decimal ProteinG { get; set; }
    public decimal CarbsG { get; set; }
    public decimal FatG { get; set; }
    public bool AiGenerated { get; set; } = false;
    public bool UserEdited { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}