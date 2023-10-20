using Microsoft.AspNetCore.Mvc;
using NotificationsAPI.Models;

namespace NotificationsAPI.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CategoriesController : ControllerBase
	{
		private static List<Category> _categories = new()
		{
			new Category{Id = "1", Name = "General"},
			new Category{Id = "2", Name = "Course"},
			new Category{Id = "3", Name = "Laboratory"}
		};

		[HttpGet]
		public IActionResult GetCategories()
		{
			return Ok(_categories);
		}

		[HttpPost]
		public IActionResult AddCategory([FromBody] Category? category)
		{
			if (category == null)
			{
				return BadRequest("Category cannot be null");
			}

			_categories.Add(category);

			return Ok(category);
		}

		[HttpPut]
		public IActionResult UpdateCategory([FromBody] Category? category)
		{
			if (category == null)
			{
				return BadRequest("Category cannot be null");
			}

			var categoryInApp = _categories.FirstOrDefault(c => c.Id == category.Id);

			if(categoryInApp == null)
			{
				return NotFound();
			}
			else
			{
				_categories[_categories.IndexOf(categoryInApp)] = category;
				return Ok(category);
			}
		}

		[HttpDelete]
		public IActionResult DeleteCategory([FromBody] string categoryId)
		{
			var category = _categories.FirstOrDefault(x => x.Id == categoryId);
			
			if (category == null)
			{
				return NotFound();
			}

			_categories.Remove(category);

			return Ok(category);
		}

	}
}
