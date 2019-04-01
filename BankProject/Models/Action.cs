using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace BankProject.Models
{
   

    
        public class Action
        {
            [BsonId]
            [BsonRepresentation(BsonType.ObjectId)]
            public string Id { get; set; }
            
          
            [BsonRepresentation(BsonType.ObjectId)]
            public string UserId { get; set; }

            [BsonElement("ActionTaken")]
            public string ActionTaken { get; set; }

            
            [BsonElement("Amount")]
            public double Amount { get; set; }
        
            [BsonElement("Balance")]
            public double Balance { get; set; }

            [BsonElement("TimeStamp")]
            public DateTime TimeStamp { get; set; }
    }
    
}
