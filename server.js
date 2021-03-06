const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const config = require('config');

require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// const uri = process.env.MONGOLAB_URI;
const uri = config.get('MONGOLAB_URI');
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

//use the routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);


//serve static asset if in production
if(process.env.NODE_ENV === 'production'){
  console.log("Production environment. Serving static asset from client/build.");
  // Set static folder
  app.use(express.static('client/build'));

  // server will serve up index.html in the build folder if in production
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
