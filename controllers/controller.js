var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");

//test user for database
var testUser ={
	id: '1',
	name: 'Jesse',
	google_id: '12345',
	email: 'jessesternmusic@gmail.com',
	imageURL: 'http://sternj20.github.io'
};

router.get("/", function(req, res){
	//create a test user
	db.User.create(testUser);
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
	res.render("index");
});

router.get("/api/generatequestions", function(req, res){
	var hbsObject = {};
	db.Question.findAll({
	})
	.then(function(data){
		hbsObject.questions = data;
		db.Activity.findAll({
			where: db.Question.id = db.Activity.QuestionId,
			include: [db.Question]
		})
		.then(function(data){
			hbsObject.completedQuestions = data;
			hbsObject.userId = '1';
			res.render("challenges", hbsObject);
		});
	});
});

//update question to completed
router.post("/api/addactivity/:id", function(req, res){
	db.Activity.create({
		QuestionId: req.params.id,
		journal_entry: 'blank',
		UserId: req.body.UserId
	});
	res.redirect("/api/generatequestions");
});

// Export routes for server.js to use.
module.exports = router;

