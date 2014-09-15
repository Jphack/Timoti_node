var passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;


/*var db = require('../config/connection');

var usersSchema = require('../models/users'),
	Users = db.model('users', usersSchema);*/

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
      Users.findById(id, function(err, user) {
        done(err, user);
      });
    });
    passport.use(new LocalStrategy({
        passReqToCallback : true
    },
      function(req, username, password, done) {
        Users.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, req.flash('failureMessage', 'Ooops, email incorrecto.'));
          }
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('failureMessage', 'Ooops, contraseña incorrecto.'));
          }
          return done(null, user);
        });
      }
    ));
};