var jwt = require('jsonwebtoken');
var express = require('express');
var express_jwt = require('express-jwt');
var cookieParser = require('cookie-parser')

var app = express();

var port = 7171;

app.use(cookieParser());

app.use(express_jwt({
  secret: 'my-secret',
  credentialsRequired: false,
  getToken: (req) => {
    return req.cookies.jwt_token;
  }
}));

app.get('/protected',
  (req, res) => {
    if(!req.user) return res.sendStatus(404);
    if(!req.user.admin) return res.sendStatus(401);
    res.send('<h2>Hi ' + req.user.name + '!<br></h2><h3>You have authority!</h3>');
  });

app.get('/jwt',
  (req, res) => {
    let token = jwt.sign({name: 'James Ford', admin: true}, 'my-secret');
    res.cookie('jwt_token', token, {httpOnly: true});
    res.send(token);
  });

app.listen(port);
console.log("Listening on port " + port);
