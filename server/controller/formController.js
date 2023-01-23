const express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

var { Form } = require('../models/form');
var User = require('../models/user');

router.get('/', (req, res) => {
    Form.find((err, docs) => {
        if (!err) {res.send(docs);}
        else { console.log('Error in Retrieving Form :' + JSON.stringify(err, undefined, 2));}
    });
});

router.post('/status', (req, res) => {
    User.findOneAndUpdate({ "email" : req.body.email }, {"status": "incomplete"}).then(res.status(200).send({message: "status changed.."}))
})

router.post('/form', (req, res) => {

    var ff = new Form({
        options1: req.body.options1,
        options2: req.body.options2,
        text1: req.body.text1,
        options3: req.body.options3,
        options4: req.body.options4,
        text2: req.body.text2,
        service: req.body.service
    });
    User.findOneAndUpdate({ "email" : req.body.email }, {"status": "complete"}).then(
    ff.save((err, docs) => {
        if(!err) {res.send(docs);}
        else{console.log("Error in Form Save: " + JSON.stringify(err, undefined, 2));}
    }));

    const output = `
    <p>Hey ${req.body.firstName}, thank you for the question! Your response has been received. You can check it here.</p>
    <h3>Message</h3>
    <p></p>
  `;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dummicy@gmail.com',
      pass: 'nqydohxbhtdoadxz'
    },
    port: 465,
    host: 'smtp.gmail.com',
    secure: true,
    tls: {
      rejectUnauthorized: false
    }
    });
    
    // sending email
    let mailOptions = {
    from: '"Feedback Form Review Team" <dummicy@gmail.com>',
    to: req.body.email,
    subject: 'Feedback Form Details',
    text: 'Hey there, thank you for visiting our site. Your response has been received. You can check it here. ',
    generateTextFromHTML: true,
    html: output
    };
    
    // Verify connection configuration
    transporter.verify(function(error, success) {
    if (error) {
          console.log(error);
    } else {
          console.log('Server is ready to take our messages');
    }
    });
    
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
        res.send('error');
    }else{
        console.log('Message sent: %s', info.messageId);
        res.send('Msg sent');}
        transporter.close();
    });
});

module.exports = router;