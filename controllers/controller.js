var express = require("express");
var router = express.Router();
var fs = require("fs");
var db = require("../models/");
var path = require("path");
var body = require("body-parser");


//route when user clicks complete button
router.post("/api/addactivity/:id", function(req, res) {
    db.Activity.create({
        QuestionId: req.params.id,
        journal_entry: 'blank',
        UserId: req.body.UserId
    });
    res.redirect('/api/generatequestions');
});

router.get("/", function(req, res){
    res.render("index");
});

router.get("/api/generatequestions/:new_user?", function(req, res){
    console.log(req.params.new_user)
    var hbsObject = {};
    db.Question.sequelize.query('Select * from Questions WHERE id NOT IN (SELECT id FROM Activities)',
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

router.post("/user/check", function(req, res) {
    var new_user = '1223'
    console.log("------------------------------");
    console.log('this is the request body guid' + new_user);
      res.redirect("/api/generatequestions/" + new_user);
    //checking to see if new user is already in user table
    db.User.findOne({
        where: {
            google_id: new_user.guid
        }
    }).then(data => {
        //if there is no corresponding user in user table create one
        if (data === null) {
            db.User.create({
                google_id: new_user.guid,
                name: new_user.name,
                email: new_user.email,
                photo: new_user.picture
            }).then(result => {
                console.log("------------------------------");
                console.log("successfully wrote new user to database");
        // redirect stuff still not working
        console.log(result);
      });
        } else {
            console.log('working')
            // console.log(data.dataValues);
      //redirect stuff still not working
      // res.send({
      //     user_data: data.dataValues
      // });

    }
  });
});

router.get("/user/check", function(req, res) {
	res.redirect("/check/")
});

router.get("/api/getuserprogress", function(req, res) {
    var hbsObject = {};
    db.User.findOne({
        where: {
            google_id:guid
        },
        include: id
        .then(function(data) {
            db.Activity.findAll({
                where: {
                    UserId: data
                },
                include: [[sequelize.fn('COUNT', sequelize.col('QuestionId')), 'completedCount']]
            });
        // .then(function(data) {
        //   hbsObject.completedQuestions = data;
        //   hbsObject.userId = '1';
        //   res.render("challenges", hbsObject);
        // });
      })
    });
});

module.exports = router;

// when the user logs in bring them to api/generatequestions/:guid

// need to associate the guid with activities instead of id from users 