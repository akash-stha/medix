var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Hosp = require('../models/hosconfig');
var User= require('../models/conf');
var Contact=require('../models/contact.js');

router.get('/search', function(req,res,next){
    if(req.query.search){
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Hosp.find({ hospname: regex}, function(err, allHospitals){
            if(err){
                console.log(err);
            }
            else{
               var noMatch;
               if(allHospitals.length < 1){
                   noMatch='No hospital match that query, please search again';
               }
               res.render("search", {hospitals: allHospitals,page: 'hospitals', title:"Hospitant || Search result", noMatch: noMatch});
            }
        });
    }
    else{
        Hosp.find({}, function(err, allHospitals){
            if(err){
                console.log(err);
            } else {
                 res.render("search",{hospitals: allHospitals, page: 'hospitals', title:'Hospitant || Search result', noMatch:undefined});
            }
         });
        
    }
});

//Getting the routes of the Hospital Profile
router.get('/search/:id', function(req, res, next){
    if(req.user){
        Hosp.getHospById(req.params.id, function(err, hospital){
            if(err){
                res.send(err);
            }
            else{
                res.render('users/hospitals/profile.ejs',{
                title: "Hospitant || "+ hospital.hospname,
                hospital: hospital
                });
            }
        });
        
    }else{
        req.flash('info', 'You must be logged in to view the hospital details');
        res.redirect('/account/patient');
    }
});


//Viewing more from the hospital profile

router.get('/users/hospitals/:id', function(req, res, next){
    if(req.user){
        Hosp.getHospById(req.params.id, function(err, hospital){
            if(err){
                res.send(err);
            }
            else{
                res.render('users/hospitals/profile.ejs',{
                title: "Hospitant || "+ hospital.hospname,
                hospital: hospital,
                user:req.user
                });
            }
        });
        
    }else{
        req.flash('info', 'You must be logged in to view the hospital details');
        res.render('/',{
            title: "Hospitant || Login user",
            welcomeMsg: '',
            notLoginMsg:"You must be logged in first"
        });
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
//Exporting models in app.js
module.exports =router;