using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 


[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _context;

    public FavoritesController(AppDbContext context)
    {
        _context = context;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            throw new UnauthorizedAccessException("User ID not found in token");

        return int.Parse(userIdClaim.Value);
    }

    [HttpGet]
    public async Task<IActionResult> GetFavorites()
    {
        var userId = GetCurrentUserId();

        var favorites = await _context.UserFavorites
            .Include(f => f.Repository)
            .Where(f => f.UserId == userId)
            .Select(f => f.Repository)
            .ToListAsync();

        return Ok(favorites);
    }

    [HttpPost("{repoId}")]
    public async Task<IActionResult> AddFavorite([FromBody] Repository repository)
    {
        var userId = GetCurrentUserId();

        // First check if repository already exists
        var existingRepo = await _context.Repositories
            .FirstOrDefaultAsync(r => r.Name == repository.Name);

        if (existingRepo == null)
        {
            // Save the repository first
            _context.Repositories.Add(repository);
            await _context.SaveChangesAsync();
            existingRepo = repository;
        }

        // Check if favorite already exists
        var existingFavorite = await _context.UserFavorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.RepositoryId == existingRepo.Id);

        if (existingFavorite == null)
        {
            // Create new favorite
            var favorite = new UserFavorite
            {
                UserId = userId,
                RepositoryId = existingRepo.Id
            };

            _context.UserFavorites.Add(favorite);
            await _context.SaveChangesAsync();
        }

        return Ok();
    }

    [HttpDelete("{repoId}")]
    public async Task<IActionResult> RemoveFavorite(int repoId)
    {
        var userId = GetCurrentUserId();

        var favorite = await _context.UserFavorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.RepositoryId == repoId);

        if (favorite != null)
        {
            _context.UserFavorites.Remove(favorite);
            await _context.SaveChangesAsync();
        }

        return Ok();
    }
}