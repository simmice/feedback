const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/FeedbackApp', (err) => {
    if(!err){
        console.log("Database connection successful.");
    }
    else{
        console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
    }
});

module.exports = { mongoose };

  