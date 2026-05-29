namespace NourishAI.Core.DTOs;

public class CreateMealRequest
{
    public DateTime LoggedAt { get; set; } = DateTime.UtcNow;
    public string? Notes { get; set; }
}