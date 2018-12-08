var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt= require('bcryptjs'); 
var Schema= mongoose.Schema;
var UserSchema = mongoose.Schema({
    username:{
        type:String,
        unique: true,
        required: true,
        trim:true,
        dropDups: true
    },
    password:{
        type:String,
        bcrypt: true,
        required:true
    },
    usr_phn:{
        type:Number
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        dropDups: true
    },
    address:{
        type:String,
        unique: false,
        lowercase: true,
        trim: true,
        required: false
    },
    medicalInfo:[
        bloodgroup={
            type: String,
            unique:false,
            lowercase: true,
            trim: true,
            index: false
        },
    ]

});
UserSchema.pre('save', true, function(next, done) {
    next();
    setTimeout(done, 100);
  });


var User = mongoose.model('user', UserSchema);
module.exports = User;



//Creating user from the register patient
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

//Exporting the getUserByEmail which is in the passport validation section
module.exports.getUserByEmail = function(email, callback){
	var query = { email: email };
	User.findOne( query, callback );
};

//Exporting the getUserByUsername which is used in the searching the user using the username
module.exports.getUserByUsername =function(username, callback){
    var query ={ username: username };
    User.findOne(query, callback);
};


module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};



module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
