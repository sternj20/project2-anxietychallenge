var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");

	//test user for database
	var testUser ={
		name: 'Jesse',
		google_id: '12345',
		email: 'jessesternmusic@gmail.com',
		imageURL: 'http://sternj20.github.io'
	};

	router.get("/", function(req, res){
		var hbsObject;
		db.Question.findAll({})
		.then(function(data){
			hbsObject	= {questions: data};
			db.Activity.findAll({})
			.then(function(data){
				hbsObject.completedQuestions = data;
			res.render("index", hbsObject);
			});
		});
	});

	router.get("/api/generatequestions", function(req, res){
		var parseData;
		fs.readFile('./public/assets/js/questions.json', 'utf8', function(err, data){
			if(err) console.log (err);
			parseData = JSON.parse(data);
			parseData.anxiety.forEach(function(element){
				db.Question.create({
					challenge: element.question,
					difficulty: element.difficulty
				});
			});
		});
		res.redirect("/");
	});

//update question to completed
router.post("/api/addactivity/:id", function(req, res){
	db.Activity.create({
		question_id: req.params.id,
		journal_entry: 'blank'
	});
	res.redirect("/")
});

// Export routes for server.js to use.
module.exports = router;