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
// };

// var testActivity = {
// 	question_id: 1,
// 	journal_entry: 'blank'
};

router.get("/", function(req, res){
	//create a test user
	// db.User.create(testUser);
// 	db.Activity.create(testActivity).then(function(user) {
//     // you can now access the newly created task via the variable task
//     console.log('success');
// })
// .catch(function(err) {
//     // print the error details
//     console.log(err);
// });
	res.render("index");
});

router.get("/api/generatequestions", function(req, res){
	var hbsObject = {};
	db.Question.sequelize.query('Select * from questions WHERE id NOT IN (SELECT id FROM activities)',
		{type: db.Question.sequelize.QueryTypes.SELECT})
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
	}).then(function(){
		res.redirect("/api/generatequestions");
	});
});

// Export routes for server.js to use.
module.exports = router;