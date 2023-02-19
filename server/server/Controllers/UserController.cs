using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly OasContext _context;

        private readonly IUserService _service;

        public UserController(OasContext context, IUserService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/all-users
        [HttpGet("/all-users")]
        public async Task<List<User>> GetAllUsers()
        {
            var count = _context.Users.Count();

            Response.Headers.Add("User-Count", count.ToString());

            return await _service.GetAllUsers();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            return await _service.GetUserById(id);
        }

        // PUT: api/update-user/5
        [HttpPut("/update-user/{id}")]
        public async Task<User> UpdateUser(int id, User user)
        {
            return await _service.UpdateUser(id, user);
        }

        // POST: api/create-user
        [HttpPost("/create-user")]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            return await _service.AddUser(user);
        }

        // DELETE: api/delete-user/5
        [HttpDelete("/delete-user/{id}")]
        public async Task DeleteUser(int id)
        {
            await _service.DeleteUser(id);
        }

        // PUT: api/first-login/5
        [HttpPut("/first-login/{id}")]
        public async Task<User> FirstLoginChangePass(int id, LoginModel user)
        {
            return await _service.FirstLoginChangePassword(id, user);
        }

        // PUT: api/changepassword/5
        [HttpPut("/changepassword/{id}")]
        public async Task<User> ChangePassword(int id, LoginModel user)
        {
            return await _service.ChangePassword(id, user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
