var express = require('express');
var router = express.Router();
var User=require('../models/conf');
var Hosp= require('../models/hosconfig');
var Pharma= require('../models/pharmaconfig');
var Contact= require('../models/contact');

router.post('/account/register-patient', function(req,res, next){
    var username= req.body.username;
    var userphone= req.body.userphone;
    var email= req.body.email;
    var password1= req.body.password1;
    var password2= req.body.password2;
    console.log(typeof(password1));
    console.log(username);
    //validation
    req.checkBody('username', 'UserName is required').notEmpty();
    req.checkBody('userphone', 'Phone number should be entered').notEmpty();
    req.checkBody('email', 'email must be entered').notEmpty();
    req.checkBody('password1','Password must be Entered').notEmpty();
    req.checkBody('password2','Password doesnot matches').matches(password1);
    //check erros
    if(userphone.length != 10){
        var msg1="";
        msg1="Phone number should be 10 digit";
    }
    if((password2 && password1).length <8){
        var msg;
        msg="Please choose your password more than 8 digit";
    }
    var errors = req.validationErrors();
    //if errors in the checkBody of the req
    if(errors || msg || msg1){
        console.log(errors);
        res.render('users/register-patient.ejs',{
            errors: errors,
            title: 'Hospitant || Register Patient',
            msg: msg,
            msg1: msg1
        });
        res.end();   
    }
    else{
        var newUser = new User({
            username:username,
            password:password1,
            usr_phn:userphone,
            email:email,
        });
        User.createUser(newUser, function(err,user){
            if(err){
                return next(err);
            }
            else{
                req.session.userId = user._id;
                req.flash('sucess_msg','You are sucessfully registered, you can now login');
                res.redirect('/account/patient');
                res.end();      
            }
        });
        
    }
    
});
//Reigister route for hospitals
router.get('/users/register-hospital', function(req,res, next){
    res.render('users/register-hospital.ejs',{
        title: "Hospitant || Register Hospital"
    });
});
//Post reguest from the register-hospital
router.post('/users/register-hospital', function(req, res, err){
    var hospname= req.body.hospname;
    var hospaddress= req.body.hospaddress;
    var hospphone = req.body.hospphone;
    var hospemail = req.body.hospemail;
    var hosppassword = req.body.hosppassword;
    var hosppassword2 = req.body.hosppassword2;
    var passlength=8;
    
    //checking for the validation
    req.checkBody('hosppassword2','Password doesnot match').matches(hosppassword);
    if((hosppassword || hosppassword2).length < passlength){
        msg="Please make your password length more than 8 digits";
    }
    var errors= req.validationErrors();
    if(errors && msg){
        console.log(errors);
        res.render('users/register-hospital.ejs',{
            errors: errors,
            title: "Hospitant || Register Hospital",
            msg: msg
        });
        res.end();
    }
    else{
        var newHosp=new Hosp({
            hospname: hospname,
            hospaddress: hospaddress,
            hospphone: hospphone,
            hospemail: hospemail,
            hosppassword: hosppassword,
        });
        Hosp.createHosp(newHosp, function(err, hosp){
            if(err) throw err;
            console.log(hosp);
        });
        req.flash('success','u are sucessfully registered');
        res.redirect('/account/hospital');
        res.end();
    }
});

//Reigister route for pharmacy
router.get('/users/register-pharma', function(req,res, next){
    res.render('users/register-pharma.ejs',{
        title: "Hospitant || Register Pharmacy"
    });
});
//Router for the post request of the register-pharma
router.post('/users/register-pharma', function(req, res, next){
    var pharma_name= req.body.pharma_name;
    var pharma_address= req.body.pharma_address;
    var pharma_phone= req.body.pharma_phone;
    var pharma_mail= req.body.pharma_mail;
    var pharma_password= req.body.pharma_password1;
    var pharma_password2 =req.body.pharma_password2;

    req.checkBody('pharma_password2', 'Password doesnot matches').matches(pharma_password);
    if((pharma_password && pharma_password2).length < 8){
        msg="Please choose your password more than 8 digit";
    }
    if((pharma_phone).length < 10){
        msg1="Please enter your phone number of length more than 10";
    }
    var errors= req.validationErrors();
    if(errors && msg && msg1){
        console.log(errors);
        res.render('users/register-pharma.ejs', {
            title:'Hospitant || Register Pharmacy',
            errors: errors,
            msg: msg
        });
    }
    else{
        var newPharma= new Pharma({
            pharma_name: pharma_name,
            pharma_address: pharma_address,
            pharma_phone: pharma_phone,
            pharma_mail: pharma_mail,
            pharma_password: pharma_password
        });
        Pharma.createPharma(newPharma, function(err, pharma){
            if(err) throw err;
            console.log(pharma);
        });
        req.flash('sucess_msg','Sucessfully registered, you can now login');
        res.redirect('account/pharmacy');
        res.end();
    }
});



//post request from the contact us
router.post('/contact-us' ,function(req, res, next){
    var contact_username=req.body.contact_username;
    var contact_email =req.body.contact_email;
    var contact_message = req.body.contact_message;

    req.checkBody('contact_username', "Username is required").notEmpty();
    req.checkBody('contact_email', 'Email is requiresd').notEmpty().notEmpty();
    req.checkBody('contact_message', 'You should enter your message').notEmpty();

    var errors= req.validationErrors();
    if(errors){
        console.log(errors);
        res.render('/contact-us.ejs', {
            title:'Hospitant || Contact-us',
            errors: errors,
            text: 'Sorry u have error'
        });
     }
     else{
        var newContact= new Contact({
            contact_username: contact_username,
            contact_email: contact_email,
            contact_message: contact_message
        });
        Contact.createContact(newContact, function(err, contact){
            if(err) throw err;
            console.log(contact);
        });
        req.flash('sucess_msg','Thank u for your message, Hospitant will soon reply u, Stay connected');
        res.render('contact-us.ejs',{
            title: "Hospitant || Contact-us",
            text: "Thank u Mr/Ms " + contact_username +" for contacting us, Our team will reply u as soon as possible"
        });
        res.end();
     }
});


module.exports = router;