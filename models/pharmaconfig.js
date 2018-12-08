var mongoose= require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt= require('bcryptjs');
var Schema= mongoose.Schema;
var PharmaSchema= mongoose.Schema({
    pharma_name:{
        type: String,
        index: false
    },
    pharma_address:{
        type: String,
        index: false,
        unique: false
    },
    pharma_phone: {
        type: Number,
        unique: false,
        index: false
    },
    pharma_mail:{
        type: String,
        unique: true,
        index: true,
        dropDups: true
    },
    pharma_password:{
        type: String,
        bcrypt: true,
        unique: false,
        index: false
    }
});
PharmaSchema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
        next();
        setTimeout(done, 100);
});
//UserSchema.plugin(passportLocalMongoose);
PharmaSchema.plugin(passportLocalMongoose);
//Exporting the h

var Pharma = mongoose.model('pharmacy', PharmaSchema);
module.exports = Pharma;

//CreateHosp function that is called in the users.js for creating hospital account 
module.exports.createPharma = function(newPharma, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newPharma.pharma_password, salt, function(err, hash) {
	        newPharma.pharma_password = hash;
	        newPharma.save(callback);
	    });
	});
};
