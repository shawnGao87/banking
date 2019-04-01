using System.Collections.Generic;
using System.Linq;
using BankProject.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace BankProject.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("db"));
            var database = client.GetDatabase("fakeDB");
            _users = database.GetCollection<User>("users");
        }

     

        public User Get(string Email)
        {
            return _users.Find(user => user.Email == Email).FirstOrDefault();
        }

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }
    }
}