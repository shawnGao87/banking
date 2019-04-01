
using Microsoft.AspNetCore.Mvc;
using BankProject.Models;
using BankProject.Services;
using System.Collections.Generic;
using MongoDB.Bson;

namespace BankProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionController : ControllerBase
    {

        private readonly ActionService _actionService;

        public ActionController(ActionService actionService)
        {
            _actionService = actionService;
        }




        [HttpGet("[action]/{id}")]
        public ActionResult<List<Action>> All(string id)
        {
            var found = _actionService.Get(id);
            
            return Ok(new { res = found });
            
            
        }



        [HttpPost("[action]")]
        public ActionResult<Action> ATM([FromBody] Action action)
        {
            action.TimeStamp = System.DateTime.Now;
            
            var balance = _actionService.getBalance(action.UserId).Balance;
            if (action.ActionTaken == "Withdraw")
            {
                action.Balance = balance - action.Amount;
            } else if (action.ActionTaken == "Deposit")
            {
                action.Balance = balance + action.Amount;
            }
            _actionService.ATM(action);
            var newBalance = _actionService.getBalance(action.UserId);
            return Ok(new { res= newBalance });
        }

        [HttpGet("[action]/{id}")]
        public ActionResult<Action> GetBalance(string id)
        {
            
            var balance = _actionService.getBalance(id);

            return Ok(new { res = balance });


        }


    }
}
