var User=require('../models/conf');
var Hosp= require('../models/hosconfig');
var Pharma= require('../models/pharmaconfig');

module.export={
    isLoggedIn:function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");
        }
    };