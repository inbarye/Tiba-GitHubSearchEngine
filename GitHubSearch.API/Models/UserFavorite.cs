public class UserFavorite
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public long RepositoryId { get; set; }
    public Repository Repository { get; set; }
}