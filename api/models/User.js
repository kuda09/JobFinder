var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");


var UserSchema = new mongoose.Schema({

    email: String,
    password: String,
    googleId: String,
    displayName: String
});

UserSchema.methods.toJSON = function () {

    var user = this.toObject();

    delete user.password;

    return user;

}

UserSchema.methods.comparePasswords = function (password, callback) {


    bcrypt.compare(password, this.password, callback );
}

var User = mongoose.model("User", UserSchema);

UserSchema.pre("save", function (next) {

    var user = this;


    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (error, salt) {

        if(error) return next(error);


        bcrypt.hash(user.password, salt, null, function (error, hash) {

            if(error) return next(error);

            user.password = hash;

            next();

        })

    })

})

module.exports = {

    User:User,
    UserSchema: UserSchema
}



