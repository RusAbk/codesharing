const mongoose = require('mongoose');

let subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    code: String,
    methodist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null
    },
    created: { 
        type: Date,
        default: Date.now
    },
    lastEdited: { 
        type: Date,
        default: Date.now
    },
});

const subjectModel = mongoose.model('Subject', subjectSchema)

module.exports = subjectModel;