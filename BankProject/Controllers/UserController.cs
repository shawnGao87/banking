
using Microsoft.AspNetCore.Mvc;
using BankProject.Models;
using BankProject.Services;

namespace BankProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserService _userService;
        private readonly ActionService _actionService;

        public UserController(UserService userService, ActionService actionService)
        {
            _userService = userService;
            _actionService = actionService;
        }


 
        [HttpPost("[action]")]
        public ActionResult<User> Register([FromBody] User user)
        {
            var exist = _userService.Get(user.Email);

            if (exist == null)
            {
                _userService.Create(user);
                var userCreated = _userService.Get(user.Email);
                _actionService.Init(userCreated.Id);
                return Ok(new { res = "success" });
            }
            else
            {
                return Ok(new { res = "user exist" });
            }
            
        }


        [HttpPost("[action]")]
        public ActionResult<User> Login([FromBody] User user)
        {

            var exist = _userService.Get(user.Email);
            
            if (exist == null)
            {
                return Ok(new { res = "no user found" });
            }
            else
            {
                if (exist.Password != user.Password)
                {
                    return Ok(new { res = "wrong password" });
                }
                else
                {
                    return Ok(new { res = exist });
                }
            }
        }


        [HttpPost("[action]")]
        public ActionResult<User> Get([FromBody] User user)
        {
            var found = _userService.Get(user.Email);
            if (found == null)
            {
                return Ok(new { res = _userService.Get(user.Email) });
            } else
            {
                return Ok(new { res = "foundU" });
            }
        }


    }
}
