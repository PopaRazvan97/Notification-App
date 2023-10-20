using Microsoft.AspNetCore.Mvc;
using NotificationsAPI.Models;
using NotificationsAPI.Service;
using System.ComponentModel.DataAnnotations;

namespace NotificationsAPI.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AnnouncementsController : ControllerBase
	{
		readonly IAnnouncementCollectionService _announcementCollectionService;

		public AnnouncementsController(IAnnouncementCollectionService announcementCollectionService)
		{
			_announcementCollectionService = announcementCollectionService
				?? throw new ArgumentNullException(nameof(AnnouncementCollectionService));
		}

		/// <summary>
		/// Gets all the announcements from the repository
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		public async Task<IActionResult> GetAnnouncements()
		{
			return Ok(await _announcementCollectionService.GetAll());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetAnnouncement(Guid id)
		{
			var announcement = await _announcementCollectionService.Get(id);
			if (announcement != null)
				return Ok(announcement);
			return NotFound($"Announcement with id {id} was not found!");
		}

		[HttpPost]
		public async Task<IActionResult> CreateAnnouncement([FromBody] Announcement announcement)
		{
			if (await _announcementCollectionService.Create(announcement))
			{
				return Ok(announcement);
			}
			return BadRequest();
		}

		[HttpPut("{announcementId}")]
		public async Task<IActionResult> UpdateAnnouncement([FromBody] Announcement? announcement, [FromRoute, Required] Guid announcementId)
		{
			var result = await _announcementCollectionService.Update(announcementId, announcement);
			if(result)
				return Ok(announcement);
			else return BadRequest();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAnnouncement([Required] Guid id)
		{
			if (await _announcementCollectionService.Delete(id))
			{
				return Ok();
			}
			return BadRequest();
		}
	}
}
