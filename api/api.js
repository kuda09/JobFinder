var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy  = require("passport-local").Strategy;




var UserModel = require("./models/User");
var jwt = require("jwt-simple");

var User = UserModel.User;


var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function (user, done) {

    done(null, user.id);

});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (error, user) {
        done(error, user);
    });
});

var getUserById;
var strategyOptions = {usernameField: 'email'};

var loginStrategy = new LocalStrategy( strategyOptions, function (email, password, done) {

    var searchUser = {
        email: email
    }

    User.findOne(searchUser, function (error, user) {


        getUserById = user;

        if (error) return done(error);


        if(!getUserById) return done(null, false, {message: 'Wrong email/password'});

        getUserById.comparePasswords(password, function (error, isMatch) {

            if (error) return done(error);

            if (!isMatch) return done(null, false, {message: 'Wrong email/password'});

            return done(null, getUserById);
        });
    });

});


var registerStrategy = new LocalStrategy (strategyOptions, function (email, password, done) {


    var searchUser = {
        email: email
    }

    User.findOne(searchUser, function (error, user) {

        if (error) return done(error);

        if(user) return done(null, false, {message: 'Username already exists'});

        var newUser = new User({

            email: email,
            password: password

        });


        newUser.save(function (error) {

            done(null, newUser);
        });

    });
})

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

app.use(function (request, response, next) {

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");


    next();
})


app.post('/register', passport.authenticate('local-register'),  function (request, response) {

    createSendToken(request.user, response);

});

var jobs = [

    'Cook',
    'Superhero',
    'Union Wisperer',
    'Toast Inspector'
];

app.get('/jobs', function (request, response) {

    var token = request.headers.authorization;

    var payLoad = jwt.decode(token, 'shhh..');


    if (!request.headers.authorization)return response.status(301).send({message: "You're not authorized to view this page"});

    if (!payLoad.sub) return response.status(401).send({message: "Authentication failed"});


    response.json(jobs);

});

app.post('/login', passport.authenticate('local-login'), function (request , response){


    createSendToken(getUserById , response);

});

function createSendToken(user, response) {

    var payLoad = {
        sub: user.id,
    }

    var token = jwt.encode(payLoad, "shhh..");

    response.status(200)
        .send({
            user: user.toJSON(),
            token: token
        });

}


mongoose.connect("mongodb://localhost/jobFinderDb");

var server = app.listen(3000, function () {

    console.log('api listening on ', server.address().port);
})

