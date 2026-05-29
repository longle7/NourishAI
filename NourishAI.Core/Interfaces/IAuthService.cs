using NourishAI.Core.DTOs;

namespace NourishAI.Core.Interfaces;

public interface IAuthService
{
    Task<AuthResponse?> RegisterAsync(RegisterRequest request);
    Task<AuthResponse?> LoginAsync(LoginRequest request);
}