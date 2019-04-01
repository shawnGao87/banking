using System.Collections.Generic;
using System.Linq;
using BankProject.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace BankProject.Services
{
    public class ActionService
    {
        private readonly IMongoCollection<Action> _action;

        public ActionService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("db"));
            var database = client.GetDatabase("fakeDB");
            _action = database.GetCollection<Action>("actions");
        }

       

        public List<Action> Get(string UserId)
        {
            return _action.Find<Action>(action => action.UserId == UserId).ToList();
        }

        public Action ATM(Action action)
        {
            _action.InsertOne(action);
            return action;
        }

        public Action getBalance(string UserId)
        {
            return _action.Find<Action>(action => action.UserId == UserId).Sort("{TimeStamp:-1}").Limit(1).FirstOrDefault();
        }

        public Action Init(string UserId)
        {
            var action = new Action();
            action.ActionTaken = "Open Account";
            action.Balance = 0;
            action.Amount = 0;
            action.UserId = UserId;
            action.TimeStamp = System.DateTime.Now;
            _action.InsertOne(action);
            return action;
        }



    }
}