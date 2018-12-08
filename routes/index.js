var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategyPatient = require('passport-local').Strategy;
var Hosp = require('../models/hosconfig');
var User= require('../models/conf');
var Contact=require('../models/contact.js');


//Serailizing the user using passport
passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

//Deserializing the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



//passport local for the patient login
passport.use('local.patient',new LocalStrategyPatient({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
     User.getUserByEmail(email, function(err, user){
         if(err) throw err;
         if(!user){
             return done(null, false, {message: 'Unknown User'});
         }
         User.comparePassword(password, user.password, function(err, isMatch){
             if(err) throw err;
             if(isMatch){
                return done(null, user);
             } else {
                 return done(null, false, {message: 'Invalid password'});
             }
         });
     });
}));


//router from patient login page
router.post('/login',
    passport.authenticate('local.patient',{failureRedirect:'/account/patient',failureFlash: true}),
    //After sucessfull passport authentication, the below function is invoked
    function(req, res, next){
        res.redirect('/users/patients/home');
        next();
});

//setting up route for the homepag
router.get('/', function(req, res, next){
	res.render('index.ejs',{
        title: 'Hospitant || Connecting patients, hospital and pharmacy',
        NotFoundMsg: ''
    });	
});
//Router for the get login 
router.get('/account', function(req,res, next){
    // if(req.user){
    //     res.redirect('/users/patients/home');
    // }else{
        res.render('users/account.ejs',{
            title: "Hospitant || Login ",
            WelcomeMsg: "Welcome to Account page of Hospitant",
            notLoginMsg:'',
            NotFoundMsg:''
        });
    // }
});

// Router for the Patient login and register section
router.get('/account/patient',function(req,res,next){
    if(req.user){
        res.redirect('/users/patients/home');
    }else{
        res.render('users/patient.ejs',{
            title: "Hospitant || Login ",
            welcomeMsg: "Welcome to login page of Hospitant",
            notLoginMsg:''
        });
    }
});

// Router for the hospital login and register section
router.get('/account/hospital',function(req, res, next){
    if(req.locals){
        res.redirect('users/hospital/home')
    }
    else{
        res.render('users/hospital.ejs',{
            title:"Hospital || Create your account, add patients and send medical reports"
        });
    }
});

// router for the register hospital
router.get("/account/register-hospital",function(req, res, next){
    res.render('users/register-hospital',{
        title:"Hospitant || register hospital"
    });
});

// router for register

router.get('/account/register-patient',function(req, res, next){
    res.render('users/register-patient.ejs',{
        title:"Hospitant || Register"
    });
});
// Router for the pharmacy login and register
router.get('/account/pharmacy',function(req, res, next){
    res.render('users/pharmacy.ejs',{
        title:"Pharmacy || Create your account,login and grow business"
    });
});

// Router for the doctors login and pharmacy
router.get('/account/doctor',function(req, res, next){
    res.render('users/doctor.ejs',{
        title:'Doctor || Create account and login'
    });
});
//Router for the account section that not found requests
router.get('/account/*',function(req, res, next){
    res.render('users/account.ejs',{
        title: "Hospitant || Account",
        NotFoundMsg: 'Your request was not Found',
        WelcomeMsg:''
    });
});
//routing the user prfile
router.get('/users/patients/home', function(req, res, next){
    if(req.user){
        // res.send("Congratulations, Your Session gonna work for u");
        res.render('users/patients/home.ejs',{
            title: "Hospitant || Home",
            user: req.user
        });
    }else{
        req.flash('You must be logged in first');
        res.render('users/login.ejs',{
            notLoginMsg:"You must be logged in first",
            welcomeMsg:'',
            title:'Hospitant || Login'
        });
    }
});
//Getting search query from the homepage
router.get('/users/patients/search', function(req,res,next){
    console.log(req.query.search);
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
               res.render("users/patients/search.ejs",
                {hospitals: allHospitals,page: 'hospitals', title:"Hospitant || Search result", noMatch: noMatch,user:req.user});
            }
        });
    }
    else{
        Hosp.find({}, function(err, allHospitals){
            if(err){
                console.log(err);
            } else {
                 res.render("users/patients/search.ejs",
                 {  hospitals: allHospitals, page: 'hospitals',
                    title:'Hospitant || Search result',
                    noMatch:undefined, user:req.user});
            }
         });
        
    }
    // res.send('This is the search for the hospital with query ' + req.query.search);
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


//Route for the logout
router.get("/logout",function(req, res, next){
   req.logOut();
   res.redirect('/');
});


router.get('/users/patients/call-ambulance', function(req, res, next){
    if(req.user){
        res.render('users/patients/call-ambulance.ejs',{
            title: "Call Ambulance"
        });
    }
    else{
        res.render('users/login',{
            title:"Hospitant|| User login",
            welcomeMsg: '',
            notLoginMsg:'You must be logged in first'
        });
    }
});

//router for the nearest hospital
router.get('/users/patients/nearest-hospital', function(req, res, next){
    if(req.user){
        res.render('users/patients/call-ambulance.ejs');
    }
    else{
        res.render('users/login',{
            title:"Hospitant|| User login",
            welcomeMsg: '',
            notLoginMsg:'You must be logged in first'
        });
    }
});

//router for the linked hospitals
router.get('/users/patients/linked-hospitals', function(req, res, next){
    if(req.user){
        res.render('users/patients/call-ambulance.ejs');
    }
    else{
        res.render('users/login',{
            title:"Hospitant|| User login",
            welcomeMsg: '',
            notLoginMsg:'You must be logged in first'
        });
    }
});


//router for the best hospital section

router.get('/users/patients/best-hospitals', function(req, res, next){
    if(req.user){
        res.render('users/patients/call-ambulance.ejs');
    }
    else{
        res.render('users/login',{
            title:"Hospitant|| User login",
            welcomeMsg: '',
            notLoginMsg:'You must be logged in first'
        });
    }
});

//router for the nearest pharmacy
router.get('/users/patients/nearest-pharmacy', function(req, res, next){
    if(req.user){
        res.render('users/patients/call-ambulance.ejs');
    }
    else{
        res.render('users/login',{
            title:"Hospitant|| User login",
            welcomeMsg: '',
            notLoginMsg:'You must be logged in first'
        });
    }
});

//router for the appoint doctor
router.get('/users/patients/appoint-doctor', function(req, res, next){
    if(req.user){
        res.render('users/patients/call-ambulance.ejs',{
            title:'Quick Doctor appointment'
        });
    }
    else{
        res.render('users/login',{
            title:"Hospitant|| User login",
            welcomeMsg: '',
            notLoginMsg:'You must be logged in first'
        });
    }
});


// router for the hospital login and showing home page

router.get('/hospitals/home',function(req, res, next){
    var LoggedIn=(req.isAuthenticated()) ? true: false;
    res.render('users/hospitals/home.ejs',{
        title:"Hospitals | Home",
        LoggedIn:LoggedIn
    });
});


// router for the nearest hospital
router.get('/nearest-hospital',function(req, res, next){
    res.render('nearest-hospital.ejs',{
        title: "Hospitant || Nearest hospital",
        NotFoundMsg:'',
        WelcomeMsg: ''
    });
});
// router for the best hospital
router.get('/best-hospital',function(req, res, next){
    res.render('best-hospital.ejs',{
        title: "Hospitant || Best Hospital",
        NotFoundMsg:'',
        WelcomeMsg: ''
    });
});
//exporting the router to app.js file
module.exports = router;

