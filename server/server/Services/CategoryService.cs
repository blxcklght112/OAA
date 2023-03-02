using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly OasContext _context;

        public CategoryService(OasContext context)
        {
            _context = context;
        }

        public async Task<Category> AddCategory(Category category)
        {
            var foundCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Name.ToLower() == category.Name.ToLower());
            if (foundCategory == null)
            {
                var item = new Category
                {
                    Name = category.Name,
                    Prefix = category.Prefix
                };

                var addingItem = await _context.Categories.AddAsync(item);

                await _context.SaveChangesAsync();

                return addingItem.Entity;
            }
            return null;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                return category;
            }
            return null;
        }
    }
}
