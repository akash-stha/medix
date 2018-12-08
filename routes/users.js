var express = require('express');
var router = express.Router();
var User=require('../models/conf');
var Hosp = require('../models/hosconfig');
var Pharma= require('../models/pharmaconfig');
var middleware=require('../middleware');


router.get('/patients/view', function(req, res, next){
    User.find({}, function(err, docs){
        if(err){
            console.log(err);
        }
        res.render('users/patients/view.ejs', {
            user: req.user
        });
    });
});




router.get("/patients/:username?", function(req, res){
    var username= req.params.username;
   // console.log(name.stringValue);
    User.getUserByUsername(username, function(err, foundUser){
        if(err){
            res.json(err);
        }
        else{
            res.render('users/patients/profile.ejs',{
                title: "Patient Profile",
                user: foundUser
            });
        }
    });
});


module.exports = router;