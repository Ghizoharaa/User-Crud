const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    confirmPhone: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Requests', requestsSchema);
