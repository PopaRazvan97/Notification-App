using Microsoft.AspNetCore.SignalR;

namespace NotificationsAPI.Service;

public class NotificationsHub : Hub
{
	public async Task BroadcastMessage(object[] message)
	{
		await Clients.All.SendAsync("message_received", message);
	}
}
