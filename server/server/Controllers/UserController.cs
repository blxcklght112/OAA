using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Common;
using server.Data;
using server.Interfaces;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Staff")]
    public class UserController : ControllerBase
    {
        private readonly OasContext _context;

        private readonly IUserService _service;

        public UserController(OasContext context, IUserService service)
        {
            _context = context;
            _service = service;
        }

        [AllowAnonymous]
        [HttpPost("/login")]
        public async Task<IActionResult> Login(LoginModel user)
        {
            var _user = _context.Users.FirstOrDefault(x => x.Username == user.Username);
            if (_user == null || (_user.Password != user.Password))
            {
                return BadRequest("Username or password is incorrect. Please try again?");
            }

            var token = GenerateJwtToken(_user);
            return Ok(new
            {
                Token = GenerateJwtToken(_user),
                Username = _user.Username,
                Role = _user.Role,
                IsFirstLogin = _user.IsFirstLogin,
                Id = _user.Id
            });

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

        [Authorize(Roles = "Admin")]
        // PUT: api/update-user/5
        [HttpPut("/update-user/{id}")]
        public async Task<User> UpdateUser(int id, User user)
        {
            return await _service.UpdateUser(id, user);
        }

        [Authorize(Roles = "Admin")]
        // POST: api/create-user
        [HttpPost("/create-user")]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            return await _service.AddUser(user);
        }

        [Authorize(Roles = "Admin")]
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

        private string GenerateJwtToken(User user)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Jwt.SIGNATURE_KEY);
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Username ?? "Unknown"),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("FirstLogin", user.IsFirstLogin.ToString())
                };
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}
