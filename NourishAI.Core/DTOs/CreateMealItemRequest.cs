namespace NourishAI.Core.DTOs;

public class CreateMealItemRequest
{
    public string FoodName { get; set; } = string.Empty;
    public string ServingUnit { get; set; } = "g";
    public decimal ServingQty { get; set; }
    public decimal CaloriesKcal { get; set; }
    public decimal ProteinG { get; set; }
    public decimal CarbsG { get; set; }
    public decimal FatG { get; set; }
    public int? UsdaFdcId { get; set; }
    public bool AiGenerated { get; set; } = false;
}