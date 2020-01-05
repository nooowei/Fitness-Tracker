const express = require('express');
const router = require('express').Router();
const passport = require('passport');
let User = require('../models/user.model');

// // dont need a get / method since we don't use the component did mount in front end
// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/').post((req, res) => {
    const {username, password} = req.body;
    //   console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res);

    // User.findOne({username: username})
    //     .then(function(doc){
    //         if(!doc){
    //             console.log("user does not exist.");
    //             res.msg = "user does not exist";
    //             res.redirect('/login');
    //         }
    //         console.log("user profile is ");
    //         console.log(doc);
    //         if(doc.password == password){
    //             //change this later
    //             res.msg = "Successfully logged in";
    //             res.redirect('/');
    //         }
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //     });
});


module.exports = router;
