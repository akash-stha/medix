var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategyHosp = require('passport-local').Strategy;
var Hosp = require('../models/hosconfig');

//Serailizing the hospital using passport
passport.serializeUser(function(hosp, done) {
    done(null, hosp._id);
  });

//Deserializing the user
passport.deserializeUser(function(id, done) {
    Hosp.findById(id, function(err, hosp) {
      done(err, hosp);
    });
});

//passport local for the hospital user
passport.use('local.hospital',new LocalStrategyHosp({
    usernameField: 'hosemail',
    passwordField: 'hospassword'
    },
    function(hosemail, hospassword, done) {
     Hosp.getHospByEmail(hosemail, function(err, hosp){
         if(err) throw err;
         if(!hosp){
             return done(null, false, {message: 'Unknown Hospital'});
         }
         Hosp.comparePassword(hospassword, hosp.hosppassword, function(err, isMatch){
             if(err) throw err;
             if(isMatch){
                return done(null, hosp);
             } else {
                 return done(null, false, {message: 'Invalid password'});
             }
         });
     });
}));

// Login route for the hospital
router.post('/hospital-login',
    passport.authenticate('local.hospital',{failureRedirect:'/account/hospital',failureFlash: true}),
    //After sucessfull passport authentication, the below function is invoked
    function(req, res, next){
        res.redirect('/hospitals/home');
        next();
});

module.exports = router;