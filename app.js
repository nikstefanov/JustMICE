var express   = require('express');
var session   = require('express-session')
var bodyParser= require("body-parser");
var expressValidator = require("express-validator")
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mysql   = require("mysql")
var allowedOrigins = require("./config/url")
var connection = mysql.createConnection(require("./config/db"))

const clientID = require("./config/oauth").id
const clientSecret = require("./config/oauth").secret
const callbackURL = allowedOrigins[0]+"/api/callback";


var app = express();

app.use(bodyParser())

app.use(function(req, res, next) {
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static("public"));
app.use(session({
    secret: 'No one can crack that password: 1auJsA,.::LsAqsS',
    resave: true,
    saveUninitialized: false
  }));

app.use(expressValidator());

app.use(passport.initialize());

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

app.get('/api/auth', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/api/callback',
  passport.authenticate('google', {
          successRedirect : '/api/test',
          failureRedirect : '/api/test'
  }));


app.get("/api/test",function(req,res){
  console.log(req.session.passport.user.email)
  connection.query("select * from user where email=?", [req.session.passport.user.email], function(err, rows, fields){
    if(rows.length>0){
      req.session.user = rows[0]
      res.writeHead(301,
          {Location: URL}
      );
      res.end();
      return
    }else{
      connection.query("insert into user(userroles_id,username,email,password,name)  Values(?,?,?,?,?)", [2,req.session.passport.user.display,req.session.passport.user.email,"THIS PASS WORD IS FROM GOOGLE",req.session.passport.user.name], function(err){
          connection.query("select * from user where email=?", [req.session.passport.user.email], function(err, rows, fields){
            req.session.user = rows[0]
            res.writeHead(301,
                {Location: URL}
            );
            res.end();
            return
          })
      } )
    }
  })
})

passport.serializeUser(function(user, done) {

    done(null,user)
});

passport.use(new GoogleStrategy({

        clientID        : clientID,
        clientSecret    : clientSecret,
        callbackURL     : callbackURL

    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {

          var name = profile.name.givenName + " " + profile.name.familyName
          var email = profile.emails[0].value
          done(null,{name: name, email: email, display: profile.displayName})

        });

    }));




var hotel = require("./routes/hotel");
app.use("/api/hotel",hotel);
var user = require("./routes/user");
app.use("/api/user",user);
var search = require("./routes/search");
app.use("/api/searchresults",search);
var selected = require("./routes/selectedVenues");
app.use("/api/select",selected);
var ev = require("./routes/event");
app.use("/api/event",ev);
var offer = require("./routes/offer");
app.use("/api/offer",offer);
var main = require('./routes/main');
app.use('/api/main', main);
var eventDetails = require("./routes/event_details");
app.use("/api/event_details",eventDetails);
var eventDetailsUpdate = require("./routes/event_details_update");
app.use("/api/event_details/update",eventDetailsUpdate);

app.listen(1337, function(){
    console.log("Port opened at 1337.");
});
