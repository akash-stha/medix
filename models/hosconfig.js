var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt= require('bcryptjs'); 
var Schema= mongoose.Schema;
var HospSchema = mongoose.Schema({
    hospname:{
        type: String,
        index:false
    },
    hospaddress:{
        type: String,
        index: false,
        unique: false
    },
    hospphone:{
        type: Number,
        index: false,
        unique:false
    },
    hospemail:{
        type: String,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        dropDups: true
    },
    hosppassword:{
        type:String,
        bcrypt: true,
        index: false,
        unique: false
    }
});
HospSchema.pre('save', true, function(next, done) {
// calling next kicks off the next middleware in parallel
    next();
    setTimeout(done, 100);
  });

//UserSchema.plugin(passportLocalMongoose);
HospSchema.plugin(passportLocalMongoose);
//Exporting the h

var Hosp = mongoose.model('hospital', HospSchema);
module.exports = Hosp;

//CreateHosp function that is called in the users.js for creating hospital account 
module.exports.createHosp = function(newHosp, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newHosp.hosppassword, salt, function(err, hash) {
	        newHosp.hosppassword = hash;
	        newHosp.save(callback);
	    });
	});
};
module.exports.getHospById = function(id, callback){
	Hosp.findById(id, callback);
};

module.exports.getHospByEmail = function(hosemail, callback){
	var query = { hospemail: hosemail };
	Hosp.findOne( query, callback );
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};
