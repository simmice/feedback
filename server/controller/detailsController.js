// const express = require('express');
// var router = express.Router();
// var ObjectId = require('mongoose').Types.ObjectId;

// var { Details } = require('../models/details');
// router.get('/find', (req, res) => {
//     Details.find((err, docs) => {
//         if(!err) {res.send(docs);}
//         else {console.log("Error in retrieving Details: " + JSON.stringify(err, undefined, 2));}
//     });
// });

// router.get('/:id', (req, res) => {
//     if(!ObjectId.isValid(req.params.id)){
//         return res.status(400).send('No record with given id : $(req.params.id');
//     }
//     Details.findById(req.params.id, (err, docs) => {
//         if(!err) {res.send(docs);}
//         else {console.log("Error in retrieving Details: " + JSON.stringify(err, undefined, 2));}
//     });
// });

// router.post('/details', (req, res) => {
//     var det = new Details({
//         services: req.body.services
//     });
//     det.save((err, docs) => {
//         if(!err) {res.send(docs); }
//         else {console.log("Error in Details Save: " + JSON.stringify(err, undefined, 2));}
//     });
// })

// module.exports = router;