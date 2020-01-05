const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  // might delete this part later for security reason
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const {username, password, email} = req.body;
  // console.log(req.body);

  const newUser = new User({username, password, email});

  //need to add alert for error handling
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('User already exist. Error: ' + err));
    //add a error handler for duplicated user
});

module.exports = router;
