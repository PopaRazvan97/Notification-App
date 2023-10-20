using MongoDB.Driver;
using NotificationsAPI.Models;
using NotificationsAPI.Settings;

namespace NotificationsAPI.Service;

public class AnnouncementCollectionService : IAnnouncementCollectionService
{
	private readonly IMongoCollection<Announcement> _announcements;

	public AnnouncementCollectionService(IMongoDbSettings settings)
	{
		var client = new MongoClient(settings.ConnectionString);
		var database = client.GetDatabase(settings.DatabaseName);
		_announcements = database.GetCollection<Announcement>(settings.AnnouncementCollectionName);
	}

	public async Task<bool> Create(Announcement entity)
	{
		if(entity.Id == Guid.Empty)
		{
			entity.Id = Guid.NewGuid();
		}
		var cursor = await _announcements.Find(announcement => announcement.Id == entity.Id).Limit(1).ToListAsync();
		if (cursor.Count == 0)
		{
			await _announcements.InsertOneAsync(entity);
			return true;
		}
		return false;
	}

	public async Task<bool> Delete(Guid id)
	{
		return await _announcements.FindOneAndDeleteAsync(announcement => announcement.Id == id) != null;
	}

	public async Task<Announcement> Get(Guid id)
	{
		return (await _announcements.FindAsync(announcement => announcement.Id == id)).FirstOrDefault();
	}

	public async Task<List<Announcement>> GetAll()
	{
		return await (await _announcements.FindAsync(announcement => true)).ToListAsync();
	}

	public async Task<List<Announcement>> GetAnnouncementsByCategoryId(string categoryId)
	{
		return await _announcements.Find(announcement => announcement.CategoryId == categoryId).ToListAsync();
	}

	public async Task<bool> Update(Guid id, Announcement entity)
	{
		entity.Id = id;
		var result = await _announcements.FindOneAndReplaceAsync(announcement => announcement.Id == id, entity);
		return result != null;
	}
}