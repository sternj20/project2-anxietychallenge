var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");

router.get("/", function(req, res){
	db.Question.findAll({})
	.then(function(data){
		hbsObject = {
			questions: data
		};
		console.log(hbsObject)
		res.render("index", hbsObject);
	});
});

router.get("/api/generatequestions", function(req, res){
	var hbsObject;
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
	res.redirect("/")
});

// Export routes for server.js to use.
module.exports = router;