using server.Models;

namespace server.Interfaces
{
    public interface ICategoryService
    {
        Task<Category> AddCategory(Category category);

        Task<List<Category>> GetAllCategories();

        Task<Category> GetCategoryById(int id);
    }
}
