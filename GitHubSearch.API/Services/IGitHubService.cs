public interface IGitHubService
{
    Task<IEnumerable<Repository>> SearchRepositoriesAsync(string query);
}