namespace NourishAI.Core.Models;

public class Meal
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime LoggedAt { get; set; } = DateTime.UtcNow;
    public string? PhotoUrl { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<MealItem> Items { get; set; } = new List<MealItem>();
}