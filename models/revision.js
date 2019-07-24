/**
 * 
 */
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

// #Overall 1 ---Titles of the two articles with highest number of revisions. 
RevisionSchema.statics.findTitleLatestRevsHighest = function(number, callback) {
	var query = [
		{$group: {_id:"$title", numOfRevisions:{$sum:1}}},
		{$sort: {numOfRevisions:-1}},
		{$limit: number}
	]
	return this.aggregate(query)
	.exec(callback)
	}

// Overall 2 --- Titles of the two articles with lowest number of revisions.
RevisionSchema.statics.findTitleLowtestRevsLowest = function(number, callback) {
	var query = [
		{$group: {_id:"$title", numOfRevisions:{$sum:1}}},
		{$sort: {numOfRevisions:1}},
		{$limit: number}
	]
	return this.aggregate(query)
	.exec(callback)
	}


// Overall function 3--- The number of artice edited by unique users(largest).
RevisionSchema.statics.findUniqueUserForLargest = function(callback){
	var query=[
	{$match:{ anon:{$exists: false}}},
		{$group: {_id:{title:"$title", user:"$user"}}},
                {$group: {_id:"$_id.title",count:{$sum:1}}},
		{$sort: {count:-1}},
		{$limit:1}
	]
	return this.aggregate(query)
	.exec(callback)
}


// Overall function4 ---  The number of artice edited by unique users(Smallest).
RevisionSchema.statics.findUniqueUserForSmallest = function(callback){
	var query=[
		{$match:{ anon:{$exists: false}}},
		{$group: {_id:{title:"$title", user:"$user"}}},
                {$group: {_id:"$_id.title",count:{$sum:1}}},
		{$sort: {count:1}},
		{$limit:1}
	]
	return this.aggregate(query)
	.exec(callback)
}

// Overall function 5 --- Top 2 articles with the longest history(oldest).
RevisionSchema.statics.findLongestHistory = function(callback){
	var query=[
		{$group: {_id:"$title", timestamp: {"$min": "$timestamp"}}},
		{$sort:{timestamp:1}},
		{$limit:2}
		]
	return this.aggregate(query)
	.exec(callback)
}

// Overall function 6 --- Top 2 articles with the shortest history(newest).
RevisionSchema.statics.findSmallestHistory = function(callback){
	var query=[
		{$group: {_id:"$title", timestamp: {"$min": "$timestamp"}}},
			{$sort:{timestamp:-1}},
		{$limit:2}
		]
	return this.aggregate(query)
	.exec(callback)
}
// Indivudual function 1 ----display the following summary information : The title
// RevisionSchema.statics.findTitleSingleBook = function(bookTitle, callback) {
// 	var query = [
// {$group: {_id:"$title"}}
// 	]

// return this.aggregate(query)
// .exec(callback)
// }
           
// Individual function 2  ---- display the following summary information : The total number of revisions
RevisionSchema.statics.findTotalNoRevisionOfABook = function(bookTitle, callback) {
	var query = [
		{$match:{title: bookTitle}},
		{$group: {_id: bookTitle , numOfRevisions:{$sum:1}}
		}
	]
	return this.aggregate(query)
	.exec(callback)
}

// Individual function 3  ----- display the following summary information : top 5 regular users ranked by total revision numbers, 
// 								and the respective revision numbers.
RevisionSchema.statics.findTopFiveRegularUser = function(bookTitle, callback) {
	var query = [
		{$match:{ anon:{$exists: false}}},
        {$match:{ usertype:'regular'}},
        {$match:{ title: bookTitle}},
        {$group:{ _id: '$user', numOfRevisionsByParticularUser:{$sum:1}}},
		{$sort:{numOfRevisionsByParticularUser:-1}},
		{$limit:5}
	]
	return this.aggregate(query)
	.exec(callback)
}


// Author Analytics function 1 ---- Display all articles that are changed (or have revisions made) by a specific author.
RevisionSchema.statics.findSpecificAuthor = function(authorName, callback) {
	var query = [
		{$match:{ anon:{$exists: false}}},
        {$match:{ user:authorName}},
        {$group: {_id:"$title", numOfRevisions:{$sum:1}}},
		
	]
	// console.log(query)
	return this.aggregate(query)
	.exec(callback)
}

// Author Analytics function 2 --- Display different timestamp of revision for a same article. 
RevisionSchema.statics.displayAllTimeStampForAnArticle= function(authorName,bookTitle ,callback) {
	var query = [
		{$match:{anon:{$exists: false}}},
		{$match:{user: authorName }},
		{$match:{title: bookTitle }},
		{$group:{_id:{title:"$title", timestamp:"$timestamp"}}},
		{$group: {_id:"$_id.timestamp"}},
		{$sort:{_id:1}}
                ]
	return this.aggregate(query)
	.exec(callback)
}
// Author Analtics Extra Function --- Display the number of timestamps of a article
RevisionSchema.statics.displayNumberOfTimestamp= function(authorName,bookTitle ,callback) {
	var query = [
        {$match:{ anon:{$exists: false}}},
        {$match:{ user: authorName}},
        {$match:{ title: bookTitle}},
        {$group: {_id:"$title", TotalnumOfRevisions:{$sum:1}}},
		
	
		]
	console.log(query)
	return this.aggregate(query)
	.exec(callback)
}


// Graph funcion query

// Overall draw bar chart 
RevisionSchema.statics.drawPieChart = function(callback){

	var query = [
	{$group: {_id: {usertype:"$usertype"}, numbOfRev: {$sum: 1}}},
    {$project: {
                _id: 0,
                usertype:"$_id.usertype",
        		numbOfRev: "$numbOfRev"
    }}
	]
	return this.aggregate(query)
	.exec(callback)
}
// Find overall admin numbers(active,semi-active,former,inactive)
RevisionSchema.statics.overallRevAdminType = function(callback){
	var query = [
		{$match:{usertype : "admin"}},
    {$group: {_id: "$admintype", numbOfRev: {$sum: 1}}},
    {$project: {
				admintype:"$admintype",
        numbOfRev: "$numbOfRev"
    }}
	]
	return this.aggregate(query)
	.exec(callback)
}




// overall draw column chart
RevisionSchema.statics.drawColumnChart = function(callback){

	var query = [
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

// Individual draw pie chart function's query.
RevisionSchema.statics.getPieChartFunction2 = function(title, callback){
	var query=
	[
		{$match: {"title": title}},
		{$group: {_id: {usertype:"$usertype"}, numbOfRev: {$sum: 1}}},
    {$project: {
				_id: 0,
				usertype:"$_id.usertype",
        numbOfRev: "$numbOfRev"
    }}
	]
	console.log(query)
	return this.aggregate(query)
	.exec(callback)
}


//Individual Article #4: Bar chart of revision number distributed by year and by user type for this article
RevisionSchema.statics.GetArticleBarChart = function(title, callback){
	console.log("We are in query revision.")
	var query = [
		{$match: {"title": title}},
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

//Individual Article #5: Pie chart of revision number distribution based on user type for this article
RevisionSchema.statics.GetArticlePieChart = function(title, callback){
	var query = [
		{$match: {"title": title}},
		{$group: {_id: {usertype:"$usertype"}, numbOfRev: {$sum: 1}}},
    {$project: {
				_id: 0,
				usertype:"$_id.usertype",
        numbOfRev: "$numbOfRev"
    }}
	]
	return this.aggregate(query)
	.exec(callback)
}

//Individual Article #6: Bar chart of revision number distributed by year made by one or a few of the top 5 users for this article
RevisionSchema.statics.GetArticleBarChartTop5 = function(title, usersArray, from, to, callback){
	console.log(title)
	console.log(typeof(usersArray));
	console.log(usersArray)
	console.log(from + " " + to);
	var query = [
		{$match: {"title": title, "user": {'$in': usersArray}}},
		{$project: {
			year: {$substr: ["$timestamp", 0, 4]},
      user: "$user"
		}},
		{$match: {year: {$gt:from, $lt:to}}},
		{$group: {_id: {year:"$year", user:"$user"}, numbOfRev: {$sum:1}}},
    {$project:{
      _id:0,
      year: "$_id.year",
      user: "$_id.user",
      numbOfRev: "$numbOfRev"
      }},
		{$sort: {"year": 1}}
	]

	console.log(query)
	return this.aggregate(query)
	.exec(callback)
}


RevisionSchema.statics.GetArticleBarChartTop5SelectedUser = function(title, user, from, to, callback){
	console.log(title)
	// console.log(typeof(usersArray));
	console.log(user)
	console.log(from + " " + to);
	var query = [
		{$match: {"title": title, "user": user}},
		{$project: {
			year: {$substr: ["$timestamp", 0, 4]},
      user: "$user"
		}},
		{$match: {year: {$gt:from, $lt:to}}},
		{$group: {_id: {year:"$year", user:"$user"}, numbOfRev: {$sum:1}}},
    {$project:{
      _id:0,
      year: "$_id.year",
      user: "$_id.user",
      numbOfRev: "$numbOfRev"
      }},
		{$sort: {"year": 1}}
	]

	console.log(query)
	return this.aggregate(query)
	.exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')
	
module.exports = Revision





