const mongoose = require ('mongoose');

var Form = mongoose.model('Form', {
    options1: { type: String, possibleValues: ['Yes', 'No'] },
    options2: { type: String, possibleValues: [1, 2, 3, 4]},
    text1: { type: String},
    options3: { type: String, possibleValues: ['Extremely', 'Very', 'Moderately', 'Slightly', 'NOt at all']},
    options4: { type: String, possibleValues: ['Excellent', 'Good', 'Fair', 'Poor', 'Satisfactorily']},
    text2: { type: String},
    service: { type: String}
});

module.exports = { Form };
