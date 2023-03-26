using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class CategoryController : ControllerBase
    {
        private readonly OasContext _context;
        private readonly ICategoryService _service;

        public CategoryController(OasContext context, ICategoryService service)
        {
            _context = context;
            _service = service;
        }

        [HttpPost("/add-category")]
        public async Task<Category> AddCategory(Category category)
        {
            return await _service.AddCategory(category);
        }

        [AllowAnonymous]
        [HttpGet("/all-categories")]
        public async Task<List<Category>> GetAllCategories()
        {
            var count = _context.Categories.Count();

            Response.Headers.Add("Category-Count", count.ToString());

            return await _service.GetAllCategories();
        }

        [AllowAnonymous]
        [HttpGet("/get-category/{id}")]
        public async Task<Category> GetCategoryById(int id)
        {
            return await _service.GetCategoryById(id);
        }
    }
}
