var Revision = require("../models/revision")
var Graph = require("../models/graph")
var url = 'mongodb://localhost:27017';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ useNewUrlParser: true });
var MongoClient = require('mongodb').MongoClient;


module.exports.showMainPage=function(req,res){
	res.render("mainpage")
}

module.exports.showFunctionPage1=function(req,res){
	res.render("function1")
}
module.exports.showFunctionPage2=function(req,res){
	res.render("function2")
}

module.exports.showFunctionPage3=function(req,res){
	res.render("function3")
}

module.exports.showHome=function(req,res){
	res.render("home")
}

module.exports.showRegister=function(req,res){
	res.render('register')
}	

module.exports.showLogin=function(req,res){
	res.render("login")
}

module.exports.showAllTimeStamp=function(req,res){
	res.render("timestamp")
}



	// Login to DB
module.exports.findOne=function(req,res){
	MongoClient.connect(url, function(err, database) {
	const myAwesomeDB = database.db('mydb')
 
	myAwesomeDB.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
 
			  if(user ===null){
				res.render('invalidLogin',{profileData:user});
			 }else if (user.name === req.body.name && user.pass === req.body.pass){
			 res.render('completeprofile',{profileData:user});
 
		   } else {
			 console.log("Credentials wrong");
			 res.render('invalidLogin',{profileData:user});
		   }
	});
 
  });
}


  

  //register to DB================================================================
//   app.post('/regiterToDb',urlencodedParser,function(req,res){
module.exports.registerToDB=function(req,res){
	var obj = JSON.stringify(req.body);
   	var jsonObj = JSON.parse(obj);
  
	res.render('profile',{loginData:req.body});
}
   
  
	
//   //register profile to MongoDB================================================================
module.exports.registerProfileToDB=function(req,res){
	 var obj = JSON.stringify(req.body);
	 console.log("Final reg Data : "+obj);
	 var jsonObj = JSON.parse(obj);
		MongoClient.connect(url, function(err, database) {
			const myAwesomeDB = database.db('mydb')
  
			myAwesomeDB.collection("userprofile").insertOne(jsonObj, function(err, res) {
  
	   if (err) throw err;
	   console.log("1 document inserted");
	   database.close();
		});
		 res.render('completeprofile',{profileData:req.body});
		})
	  
  }


module.exports.getTopRevisedArticle=function(req,res){
	number = parseInt(req.query.number,10);
    console.log(number);
	
	Revision.findTitleLatestRevsHighest(number, function(err, result){
		if (err){
			console.log(err)
		}else{
			revision = result;
			res.send(revision)
			console.log("The input number is: ",number)
			console.log("latest: ", revision)
			
    }
  })
}


module.exports.getLowestRevisedArticle=function(req,res){
	number = parseInt(req.query.number,10);
	console.log("We are in controller.")
    console.log(number);

	Revision.findTitleLowtestRevsLowest(number, function(err, result){
		if (err){
			console.log(err)
		}else{
		
			revision = result;
			res.send(revision)
		}	
	})
}

module.exports.getUniqueUserRevisedArticleLargest=function(req,res){


	Revision.findUniqueUserForLargest(function(err, result){
		if (err){
			console.log(err)
		}else{
			console.log(result)
			revision = result;
			res.send(revision)

		}	
	})
}

module.exports.getUniqueUserRevisedArticleLowest=function(req,res){

	Revision.findUniqueUserForSmallest(function(err, result){
		if (err){
			console.log(err)
		}else{
			console.log(result)
			revision = result;
			res.send(revision)
		}	
	})
}


module.exports.getLongestHistoryArticle=function(req,res){
	number = parseInt(req.query.number,10);
    console.log(number);

	Revision.findLongestHistory(function(err,result){
		if (err){
			console.log(err)
		}else{
			revision = result;
			res.send(revision)
		}	
	})
}

module.exports.getShortestArticle=function(req,res){
	number = parseInt(req.query.number,10);
    console.log(number);

	Revision.findSmallestHistory(function(err,result){
		if (err){
			console.log(err)
		}else{
			revision = result;
			res.send(revision)
		}	
	})
}

module.exports.getTotalRevisedNo=function(req,res){
	name = req.query.title
	console.log("We are doing indi getTotalRevisedNo")
    console.log(name);
	
	
	Revision.findTotalNoRevisionOfABook(name, function(err,result){
		if (err){
			console.log(err)
		}else{
			revision = result;
			console.log(revision)
			res.send(revision)
		}
	})
}
module.exports.getTotalNumberOfRevisions=function(req,res){
	name = req.query.title
	console.log("We are in second function of indi part", name)
	Revision.findTopFiveRegularUser(name, function(err,result){
		if (err){
			console.log(err)
		}else{
			
			revision = result;
			console.log(revision)
			res.send(revision)

		}
	})
	
}	

module.exports.getAuthorInformation=function(req,res){
	authorName = req.query.authorTitle
	console.log("We are in revision part: ", authorName)
	revision3=""
	revision4=""

	
	Revision.findSpecificAuthor(authorName,function(err,result){
		if(err){
			console.log(err)

		}else{
			revision3= result;
			console.log("This is the result: ",revision3)
			res.json(revision3);
		}
	})
}

module.exports.getIndividualTimestamp=function(req,res){
	authorName = req.query.authorName
	bookTitle = req.query.bookTitle

	
	Revision.displayAllTimeStampForAnArticle(authorName, bookTitle, function(err,result){
		if(err){
			console.log(err)

		}else{
			revision3= result;
			res.send(revision3)
			console.log("send back result")

		}
	})
	
}

module.exports.getIndividualNumberOfRevision=function(req,res){

	authorName = req.query.authorName
	bookTitle = req.query.bookTitle
	
	console.log("We are in controller processing")
	console.log("The authorName is: ", authorName)
	console.log("The type of authorName is", typeof authorName)
	console.log("The bookTitle is: ", bookTitle)
	console.log("The type of bookTitle is: ", typeof bookTitle)

	
	Revision.displayNumberOfTimestamp(authorName, bookTitle, function(err,result){
		
		if(err){
			console.log(err)	

		}else{
			revision5= result;
			res.send(revision5)
			
		}
	})
}


module.exports.getPieChart=function(req,res){
	Revision.drawPieChart(function(err,result){
		if(err){
			console.log(err)

		}
		else{
			revision = result;
			res.json(result);
				
				
		}
	})
}

module.exports.getPieChartAdminType = function(req,res){
	Revision.overallRevAdminType(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			revision= result
			res.json(result);
		}
	})
}

module.exports.getColumnChart=function(req,res){
	Revision.drawColumnChart(function(err,result){
		if(err){
			console.log(err)

		}
		else{
			revision = result;
			res.json(result);
				
				
		}
	})
}

module.exports.getPieChartFunction2=function(req,res){
	var title = req.query.bookTitle;

	Revision.getPieChartFunction2(title,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			console.log(result)
			revision =result;
			res.json(revision);
		}
})
}

module.exports.getBarChartFunction2 = function(req,res){
	console.log("We are in controller")
	var title = req.query.bookTitle;
	
	Revision.GetArticleBarChart(title,function(err,result){
		if(err){
			console.log(err)
		}
		else{
			console.log(result)
			revision =result;
			res.json(revision)
		}
	})
}

module.exports.GetArticleBarChartTop5SelectedUser = function(req,res){
	console.log("we are in controller.")
	var title = req.query["bookTitle"];
	var user = req.query['user'];
	var startYear = req.query['from'];
	var endYear = req.query['end'];
	console.log(title)
	console.log(user)


	Revision.GetArticleBarChartTop5SelectedUser(title,user,startYear,endYear,function(err,result){
		if(err){
			console.log(err)
			res.json({});
		}
		else{
			console.log(result)
			revision =result;
			res.json(revision);
		}
	})
}
module.exports.testing = function(req,res){
	console.log("We are inside the routes")
}