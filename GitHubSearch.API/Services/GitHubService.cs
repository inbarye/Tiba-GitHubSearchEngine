using Octokit;

public class GitHubService : IGitHubService
{
    private readonly GitHubClient _gitHubClient;

    public GitHubService()
    {
        _gitHubClient = new GitHubClient(new ProductHeaderValue("GitHubSearchApp"));
    }

    public async Task<IEnumerable<Repository>> SearchRepositoriesAsync(string query)
    {
        var searchRequest = new SearchRepositoriesRequest(query);
        var result = await _gitHubClient.Search.SearchRepo(searchRequest);

        return result.Items.Select(r => new Repository
        {
            Id = r.Id,
            Name = r.Name,
            Description = r.Description,
            Url = r.HtmlUrl,
            Stars = r.StargazersCount,
            Language = r.Language
        });
    }
}