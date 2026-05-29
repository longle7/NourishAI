namespace NourishAI.Core.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal? HeightCm { get; set; }
    public decimal? WeightKg { get; set; }
    public DateOnly? BirthDate { get; set; }
    public string ActivityLevel { get; set; } = "sedentary";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}