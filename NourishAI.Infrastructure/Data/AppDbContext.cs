using NourishAI.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace NourishAI.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
}