namespace NotificationsAPI.Settings;

public interface IMongoDbSettings
{
    string AnnouncementCollectionName { get; set; }
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
}
