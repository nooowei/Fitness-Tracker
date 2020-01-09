const express = require('express');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

let User = require('../models/user.model');


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {username, password, email} = req.body;

  // // propbably redundent since front end already checks this
  // // check if any fields are missing
  // if (!username || !password || !email) {
  //   return res.json({ msg: 'Please enter all fields' });
  // }

  //check if user has already registered with this email
  User.findOne({username})
    .then(user => {
      if(user){
        res.json({msg: "Username already taken."});
      }
    });

  //check if user has already registered with this email
  User.findOne({email})
    .then(user => {
      if(user){
        res.json({msg: "Email already registered."});
      }

      const newUser = new User({username, password, email});

      //use bcrypt to secure password into hash, then save to DB
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          // save the user data, also generate and sign token
          newUser
            .save()
            .then(user => {
              // we will now sign the token, 
              // jwt.sign() function's 1st parameter is the payload we want to add, can be anything
              // 2nd parameter is the secret, which we will pull from config
              // 3rd parameter is the expiration time, optional
              // 4th parameter is the callback function
              jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                { expiresIn: 3600},
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token: token,
                    user:{
                      id: user.id,
                      username: user.username,
                      email: user.email
                    }
                  });
                }
              )


              
            })
            .catch(err => console.log(err));
        });
      });
    })

});

// verify user from token
router.get('/user', auth, (req, res) => {
  console.log('got to /users/user');
  User.findById(req.user.id).select('-password').then(user => res.json(user));
})

module.exports = router;

