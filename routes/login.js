const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');


router.route('/').post((req, res) => {
    const {email, password} = req.body;
    // console.log(req.body);

    // this might be redundent since bootstrap form is already checking it at front end
    // check if any fields are missing
    if (!email || !password) {
        return res.json({ msg: 'Please enter all fields' });
    }

    //check if user has already registered with this email
    User.findOne({email})
    .then(user => {
      if(!user){
        // res.status(400).json({msg: "User doesn't exist."});
        res.json({msg: "User doesn't exist."});
      }

      //use bcrypt to compare password from the DB
      bcrypt.compare(password, user.password)
          .then(isMatch => {
              if(!isMatch){
                  // return res.status(400).json({msg: 'Invalid Password.'});
                  return res.json({msg: 'Invalid Password.'});
              }
              // sending JWT again 
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
      
    })
});

module.exports = router;
