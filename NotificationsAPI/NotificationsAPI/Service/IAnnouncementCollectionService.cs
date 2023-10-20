using NotificationsAPI.Models;

namespace NotificationsAPI.Service;

public interface IAnnouncementCollectionService : ICollectionService<Announcement>
{
	Task<List<Announcement>> GetAnnouncementsByCategoryId(string categoryId);
}
