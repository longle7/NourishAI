using NourishAI.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace NourishAI.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Meal> Meals => Set<Meal>();
    public DbSet<MealItem> MealItems => Set<MealItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fix decimal precision warnings
        modelBuilder.Entity<User>()
            .Property(u => u.HeightCm)
            .HasPrecision(5, 2);

        modelBuilder.Entity<User>()
            .Property(u => u.WeightKg)
            .HasPrecision(5, 2);

        modelBuilder.Entity<MealItem>()
            .Property(m => m.ServingQty)
            .HasPrecision(8, 2);

        modelBuilder.Entity<MealItem>()
            .Property(m => m.CaloriesKcal)
            .HasPrecision(8, 2);

        modelBuilder.Entity<MealItem>()
            .Property(m => m.ProteinG)
            .HasPrecision(8, 2);

        modelBuilder.Entity<MealItem>()
            .Property(m => m.CarbsG)
            .HasPrecision(8, 2);

        modelBuilder.Entity<MealItem>()
            .Property(m => m.FatG)
            .HasPrecision(8, 2);
    }
}