const express = require('express');
var router = express.Router();
const session = require('express-session');
var ObjectId = require('mongoose').Types.ObjectId;
const PASSPORT = require('passport');

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {roles} = require('../models/role');

// Middleware to test if authenticated
// function sessionChecker(req, res, next) {
//     console.log(`Session Checker: ${req.session.id}`.green);
//     console.log(req.session);
//     if (req.session.profile) {
//         console.log(`Found User Session`.green);
//         next();
//     } else {
//         console.log(`No User Session Found`.red);
//         res.redirect('/login');
//     }
// }

// router.get('/', (req, res) => {
//     // this is only called when there is an authentication user due to isAuthenticated
//     res.redirect('/dashboard');
//   });

// router.get('/', (req, res) => {
//     User.find((err, docs) => {
//         if (!err) {res.send(docs);}
//         else { console.log('Error in Retrieving User :' + JSON.stringify(err, undefined, 2));}
//     });
// });

// router.post('/', async (req, res, next) => {
//     try{
//         const{email, role} = req.body
//         const newUser = new User({email, role: role || "basic", });
//         const accessToken = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
//             expiresIn: "1d"
//         });

//         newUser.accessToken = accessToken;
//         newUser.accessToken = accessToken;
//         await newUser.save();
//         res.json({
//             data:newUser,
//             accessToken
//         })
//     } catch(error) {
//         next(error);
//     }



    // console.log(req.body);
    // var user = new User({
    //     email: req.body.email,
    //     firstName: req.body.firstName,
    //     id: req.body.id,
    //     idToken: req.body.idToken,
    //     lastName: req.body.lastName,
    //     name: req.body.name,
    //     photoUrl: req.body.photoUrl,
    //     provider: req.body.provider,
    //     status: ''
    // });
   
    
    // user.save((err, docs) => {
    //     if(!err) {res.send(docs);}
    //     else{console.log("Error in Form Save: " + JSON.stringify(err, undefined, 2));}
    // });

// router.get('/logout', (req) => {
//     req.session.destroy(function(err) {
//         console.log('Destroyed session');
//      })
//     res.redirect('/login');
// });

module.exports = {
    signup: async (req, res, next) => {
            try{
                const{email, role} = req.body
                const newUser = new User({email, role: role || "basic", });
                const accessToken = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                });
        
                newUser.accessToken = accessToken;
                newUser.accessToken = accessToken;
                await newUser.save();
                res.json({
                    data:newUser,
                    accessToken
                })
            } catch(error) {
                next(error);
            }
    },
    login: async(req, res, next) => {
        try{
            const {email} = req.body;
            const user = await User.findOne({ email });
            if(!user) return next(new Error('Already filled the form'))
            const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            await User.findByIdAndUpdate(user._id, { accessToken })
            res.status(200).json({
                data: user,
                accessToken
            })
        } catch(error){
            next(error);
        }
    },

    getAllUsers: async(req, res, next) =>{
        const users = await User.find({});
        res.status(200).json({
            data:users
        });
    },

    getOneUser: async(req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
            if (!user) return next(new Error('User does not exist'));
             res.status(200).json({
             data: user
            });
           } catch (error) {
            next(error)
           }
    },

    updateUser: async (req, res, next) => {
        try {
         const update = req.body
         const userId = req.params.userId;
         await User.findByIdAndUpdate(userId, update);
         const user = await User.findById(userId)
         res.status(200).json({
          data: user,
          message: 'User has been updated'
         });
        } catch (error) {
         next(error)
        }
       },

    deleteUser: async (req, res, next) => {
        try {
         const userId = req.params.userId;
         await User.findByIdAndDelete(userId);
         res.status(200).json({
          data: null,
          message: 'User has been deleted'
         });
        } catch (error) {
         next(error)
        }
    },
    grantAccess: (action, resource) => async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    },
        
    allowIfLoggedin: async (req, res, next) => {
        try {
            const user = res.locals.loggedInUser;
            if (!user)
                return res.status(401).json({
                    error: "You need to be logged in to access this route"
                });
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}



// module.exports = router;

// module.exports = {
//     login: (req, res) => {
//         console.log(req.body);
//         var user = new User({
//            email: req.body.email,
//            firstName: req.body.firstName,
//            id: req.body.id,
//            idToken: req.body.idToken,
//            lastName: req.body.lastName,
//            name: req.body.name,
//            photoUrl: req.body.photoUrl,
//            provider: req.body.provider,
//            status: ''
//     });
    
    
//     user.save((err, docs) => {
//         if(!err) {res.send(docs);}
//         else{console.log("Error in Form Save: " + JSON.stringify(err, undefined, 2));}
//     });

//     PASSPORT.authenticate('local-login', (err, token) => {
//         if (err || !token) {
//             return res.status(400).json({
//                 message: 'Invalid Credentials!'
//             });
//         }

//         return res.status(200).json({
//             message: 'Login successful!',
//             data: token
//         });
//     })(req, res);
//     },

//     logout: (req) => {
//         req.session.destroy(function(err) {
//                     console.log('Destroyed session');
//                  })
//                 res.redirect('/login');
//     }
// }