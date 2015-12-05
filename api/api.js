var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var UserModel = require("./models/User");
var jwt = require("jwt-simple");

var User = UserModel.User;


var app = express();

app.use(bodyParser.json());
app.use(function (request, response, next) {

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");


    next();
})


app.post('/register', function (request, response) {

    var user = request.body;

    var newUser = new User({

        email: user.email,
        password: user.password

    });


    newUser.save(function (error) {

        createSendToken(newUser, response);

    });

});

var jobs = [

    'Cook',
    'Superhero',
    'Union Wisperer',
    'Toast Inspector'
];

app.get('/jobs', function (request, response) {

    var token = request.headers.authorization.split(' ')[1];

    var payLoad = jwt.decode(token, 'shhh..');


    if (!request.headers.authorization)return response.status(301).send({message: "You're not authorized to view this page"});

    if (!payLoad.sub) return response.status(401).send({message: "Authentication failed"});


    response.json(jobs);

});

app.post('/login', function (request, response) {

    request.user = request.body;

    var searchUser = {email: request.user.email};

    User.findOne(searchUser, function (error, user) {

        if (error) throw new Error("Something went wrong");

        if(!user) return response.status(401).send({message: 'Wrong email/password'});


        user.comparePasswords(request.user.password, function (error, isMatch) {

            if (error) console.log(error);

            if (!isMatch) return response.status(401).send({message: 'Wrong email/password'});

            createSendToken(user, response);
        });
    })
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


mongoose.connect("mongodb://localhost/psjwt");


var server = app.listen(3000, function () {

    console.log('api listening on ', server.address().port);
})

