using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Services
{
    public class UserService : IUserService
    {
        private OasContext _context;

        public UserService(OasContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User user)
        {
            //Auto Generate Username
            string[] words = user.LastName.Split(" ");
            var subUsername = "";
            foreach (var word in words)
            {
                subUsername += word.Substring(0,1);
            }

            var _username = user.FirstName + subUsername;

            var _usernames = _context.Users.Select(x => x.Username).Where(y => y.Contains(_username)).ToArray();

            var orderedList = _usernames.OrderBy(x => new string(x.Where(char.IsLetter).ToArray()))
                                        .ThenBy(x =>
                                        {
                                            int number;
                                            if (int.TryParse(new string(x.Where(char.IsDigit).ToArray()), out number))
                                                return number;
                                            return -1;
                                        }).ToList();

            if (orderedList.Count() > 0)
            {
                string a = orderedList.Last();
                string b = string.Empty;
                int c;
                for (int i = 0; i < a?.Length; i++)
                {
                    if (Char.IsDigit(a[i]))
                    {
                        b += a[i];
                    }
                }
                if (b == "")
                {
                    _username += "1";
                }
                else if (b.Length > 0)
                {
                    a = a.Remove(a.Length - b.Length);
                    c = int.Parse(b) + 1;
                    _username += c.ToString();
                }
            }

            //Auto Generated UserCode
            var _ids = _context.Users.Select(x => x.Id).ToArray();
            Array.Sort(_ids);
            int subUserCode = _ids.Last() + 1;

            var addingUser = await _context.Users.AddAsync(
                new User
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    FullName = user.LastName + " " + user.FirstName,
                    Dob = user.Dob,
                    JoinedDate = user.JoinedDate,
                    Gender = user.Gender,
                    Role = user.Role,
                    Username = _username,
                    Password = _username + "@" + user.Dob.ToString("ddMMyyyy"),
                    UserCode = $"SD{subUserCode:0000}",
                    IsFirstLogin = true
                }
            );

            await _context.SaveChangesAsync();

            return addingUser.Entity;
        }

        public async Task<User> ChangePassword(int id, LoginModel user)
        {
            var _user = await _context.Users.FindAsync(id);
            
            if(_user != null)
            {
                _user.Password = user.Password;

                _context.Users.Update(_user);

                await _context.SaveChangesAsync();

                return _user;
            }

            return null;
        }

        public async Task DeleteUser(int id)
        {
            var _user = await _context.Users.FindAsync(id);

            if(_user != null)
            {
                _context.Users.Remove(_user);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<User> FirstLoginChangePassword(int id, LoginModel user)
        {
            var _user = await _context.Users.FindAsync(id);
            
            if (_user != null && _user.IsFirstLogin == true)
            {
                _user.Password = user.Password;
                _user.IsFirstLogin = false;

                _context.Users.Update(_user);

                await _context.SaveChangesAsync();

                return _user;
            }

            return null;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            var _user = await _context.Users.FindAsync(id);

            if(_user != null )
            {
                return _user;
            }

            return null;
        }

        public async Task<User> UpdateUser(int id, User user)
        {
            var _user = await _context.Users.FindAsync(id);
            if(_user != null)
            {
                _user.FirstName = _user.FirstName;
                _user.LastName = _user.LastName;
                _user.FullName = _user.FullName;
                _user.UserCode = _user.UserCode;
                _user.Username = _user.Username;
                _user.Password = _user.Password;
                _user.Dob = user.Dob;
                _user.JoinedDate = user.JoinedDate;
                _user.Gender = user.Gender;
                _user.Role = user.Role;

                _context.Users.Update(_user);

                await _context.SaveChangesAsync();

                return _user;
            }

            return null;
        }
    }
}
