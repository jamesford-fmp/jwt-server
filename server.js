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
    if(!req.user) {
      console.log("No auth token, redirecting");
      res.redirect('/jwt');
    }
    if(!req.user.admin) return res.sendStatus(401);
    res.json(req.user);
  });

app.get('/jwt',
  (req, res) => {
    let token = jwt.sign({name: 'James Ford', admin: true}, 'my-secret');
    res.cookie('jwt_token', token, {httpOnly: true});
    res.send(token);
  });

app.listen(port);
console.log("Listening on port " + port);
