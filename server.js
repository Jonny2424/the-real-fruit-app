// Dependencies required for the app to run
require('dotenv').config();

const express = require('express');

const methodOverride = require('method-override');
const routes = require('./routes');
// calling the express function into play
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Adding static folders/files -- CSS 
app.use(express.static('public'));

// Used for JWT
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt; // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  
    console.log("Cookies: ", req.cookies.jwt);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err || !decodedUser) {
        return res.status(401).json({ error: "Unauthorized Request" });
      }
      req.user = decodedUser; // ADDS A .user PROP TO REQ FOR TOKEN USER
      console.log(decodedUser);
  
      next();
    });
};

app.use('/users', verifyToken, routes.users);
// User routes
app.use('/auth', routes.auth);
app.use('/users', routes.users);
app.use('/fruits', routes.fruits);

//Homepage
app.get('/', (req, res) => {
 res.render('users/homePage.ejs')
})




// The port the server is running on
app.listen(process.env.PORT, () => {
    console.log(`I am on port ${process.env.PORT}`)
})

