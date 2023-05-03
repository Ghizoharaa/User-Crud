const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,

    },
    
});

module.exports = mongoose.model('Services', ServicesSchema);
