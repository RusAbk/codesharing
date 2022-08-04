const mongoose = require('mongoose');

let listingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    code: String,
    author: String,
    password: String,
    hash_id: String,
    created: { 
        type: Date,
        default: Date.now
    },
    lastEdited: { 
        type: Date,
        default: Date.now
    },
});

const listingModel = mongoose.model('Listing', listingSchema)

module.exports = listingModel;