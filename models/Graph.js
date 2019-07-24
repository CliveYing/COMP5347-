var mongoose = require('./db');
var fs = require('fs');

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
        })
        
RevisionSchema.statics.displayNumberOfTimestamp= function(authorName,bookTitle ,callback) {
     var query=   [
         {$project: {
            year: {$substr: ["$timestamp", 0, 4]},
            usertype: "$usertype"
        }},
    {$group: {_id: {year:"$year", usertype:"$usertype"}, numbOfRev: {$sum: 1}}},
    {$project: {
            _id: 0,
            year: "$_id.year",
            usertype:"$_id.usertype",
      numbOfRev: "$numbOfRev"
    }},
        {$sort: {"year": 1}}
    ]
    return this.aggregate(query)
    .exec(callback)
}