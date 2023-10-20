﻿using NotificationsAPI.Models;

namespace NotificationsAPI.Settings;

public class MongoDbSettings : IMongoDbSettings
{
	public string AnnouncementCollectionName { get; set; }
	public string ConnectionString { get; set; }

	public string DatabaseName { get; set; }
}
