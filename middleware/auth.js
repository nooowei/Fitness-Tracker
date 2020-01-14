const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// function for getting the token sent from front-end
function auth(req, res, next){
    // this is the header value we want to check for the token
    const token = req.header('x-auth-token');

    //check if token exists 
    if(!token){
        res.status(401).json({msg: "Unauthrized access."});
    }

    try{
        // if there is token. we need to verify it
        // jwt.verify() takes 2 parameters, token and the secret
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        console.log("decoded = jwt.verify() is: ");
        console.log(decoded);
        req.user = decoded;
        next();
    } catch(e){
        res.status(400).json({msg: "Token is not valid"});
    }

}

module.exports = auth;