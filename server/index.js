const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/user');
const routes = require('./config/routes.js');

const { mongoose } = require('./config/db.js');
// var detailsController = require('./controller/detailsController.js');
var formController = require('./controller/formController.js');
var userController = require('./controller/userController.js');

require("dotenv").config({
    path: path.join(__dirname, "../.env")
   });

const app = express();
app.set('view engine', 'pug');
app.set('views','./views');

// parsing the incoming data
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

app.use(cookieParser());

// Setting up CORS
app.use(cors());

// Initializing the session of express-session package
app.use(session({key:'feedback', secret: 'Shhhh', resave:false, saveUninitialized: true, cookie:{expires:600000, secure:true}}));

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
     next(); 
    } 
   });

// app.get('/', (req, res) => {
//         if (req.session.page_views) {
//             req.session.page_views++;
//             res.send("You visited this page " + req.session.page_views + " times");
//         } else {
//             req.session.page_views = 1;
//             res.send("Welcome to this page for the first time!");
//         }
//     });


// app.use(detailsController);
app.use(formController);
// app.use(userController);
app.use(routes);

app.listen(3000, () => {console.log('Server started at port : 3000')});

module.exports = app;

