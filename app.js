var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
// var morgan=require('morgan');
var MongoStore = require('connect-mongo')(session);

//Requiring mongoose variable
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Hospitant', { useMongoClient: true });
mongoose.connect('mongodb://127.0.0.1:27017/Hospitant.hospitals', { useMongoClient: true });
mongoose.connect('mongodb://127.0.0.1:27017/Hospitant.users', { useMongoClient: true});
mongoose.connect('mongodb://127.0.0.1:27017/Hospitant.pharmacies',{useMongoClient: true});
mongoose.Promise = global.Promise;
 
//init app
var app = express();

//setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root    = namespace.shift(),
      formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.locals.errors= null;
app.locals.msg= null;
app.locals.message= null;
app.locals.msg1= null;
//Express message middleware
// app.use(require('connect-flash')());
// app.use(function(req, res, next){
//     res.locals.messages= require('express-messages')(req, res);
//     next();
// });

// BodyParser Middleware
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



//Middleware for Express Session
app.use(session({
    secret: 'ThisistheHospiant1234@1234',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({url:'mongodb://127.0.0.1:27017/Hospitant', autoReconnect: true})
    //store: session
}));

// Passport Middleware init
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.session());

//Requiring the routes
var routes = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var register = require('./routes/register');
var login= require('./routes/login');




// Connect Flash
app.use(flash());
app.use(function(req, res, next){
    res.locals.user= req.user;
    res.locals.success= req.flash('success');
    res.locals.error = req.flash('error');
  next();
});


//Using routes
app.use('/', routes);
app.use('/users', users);
app.use('/', search);
app.use('/', register);
app.use('/',login);

//Router to get when the request is not in order
app.get('users/patients/*',function(){
  res.render('index.ejs',{
    NotFoundMsg: "your request is not found",
    title:'Hospitant || Connecting Patients, Hospitals and Pharmacy',
    });
});
app.get('/*', function(req, res, next){
   res.render('index.ejs',{
        NotFoundMsg: "your request is not found",
        title: "Hospitant || Connecting patients, Hospital and pharmacy"
   });
});

// Set Port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});