var mongoose= require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt= require('bcryptjs');
var Schema= mongoose.Schema;
var ContactSchema= mongoose.Schema({
    contact_username:{
        type: String,
        unique:false,
        index: false
    },
    contact_email:{
        type: String,
        unique:false,
        lowercase: true,
        index: false
    },
    contact_message: {
        type: String,
        unique:false,
        index: false
    },
   
});
ContactSchema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
        next();
        setTimeout(done, 100);
});
//UserSchema.plugin(passportLocalMongoose);
ContactSchema.plugin(passportLocalMongoose);
//Exporting the h

var Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;

//CreateHosp function that is called in the users.js for creating hospital account 
module.exports.createContact = function(newContact, callback){
	newContact.save(callback);
};
