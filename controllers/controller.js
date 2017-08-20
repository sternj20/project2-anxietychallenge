var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/", function(req, res){
	fs.readFile('./public/assets/js/questions.json', 'utf8', function(err, data){
		if(err) console.log (err);
		console.log(data);
	});
	res.render("index");
});

// Export routes for server.js to use.
module.exports = router;