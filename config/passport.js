const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user.model');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
        console.log("in localStrategy, username and password are: " + username + "  " + password);  //working
      // Match user
      User.findOne({
        username: username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Username not found!' });
        }

        if( password == user.password){
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
        // // Match password, use bcrypt later 
        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
        //   if (isMatch) {
        //     return done(null, user);
        //   } else {
        //     return done(null, false, { message: 'Password incorrect' });
        //   }
        // });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
