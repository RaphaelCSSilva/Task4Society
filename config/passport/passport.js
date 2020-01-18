 //we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
//We will need the models folder to check passport agains
var db = require("../../models");
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: '372892386263-rigb9qlopp8n83it0f5drhl15tcdhjub.apps.googleusercontent.com',
  clientSecret: 'tfawL1xT6KmKsXZkYuWqD_v1',
  callbackURL: 'http://127.0.0.1:5500/auth/google/callback',
  prompt: 'consent'
},
  (token, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, {
      profile: profile,
      token: token
    });
}));

//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;
