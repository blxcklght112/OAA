using server.Models;

namespace server.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsers();

        Task<User> AddUser(User user);

        Task DeleteUser(int id);

        Task<User> GetUserById(int id);

        Task<User> UpdateUser(int id, User user);

        Task<User> ChangePassword(int id, LoginModel user);

        Task<User> FirstLoginChangePassword(int id, LoginModel user);
    }
}
