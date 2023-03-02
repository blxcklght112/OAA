using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [Authorize(Roles = "Admin")]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpPost("/addcategory")]
        public async Task<Category> AddCategory(Category category)
        {
            return await _service.AddCategory(category);
        }

        [AllowAnonymous]
        [HttpGet("/getallcategories")]
        public async Task<List<Category>> GetAllCategories()
        {
            return await _service.GetAllCategories();
        }

        [AllowAnonymous]
        [HttpGet("/getcategory/{id}")]
        public async Task<Category> GetCategoryById(int id)
        {
            return await _service.GetCategoryById(id);
        }
    }
}
