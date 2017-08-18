var express = require("express");
var body = require("body-parser");
var path = require("path");
var app = express();
var router = require(path.join(__dirname, "controllers", "controller.js"));

var PORT = process.env.PORT || 7000;

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join('public')));

app.use("/", router);


app.listen(PORT, function(error) {
	if (error){
		return console.log(error);
	}
  console.log("App listening on PORT " + PORT);
});


