let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    created: { 
        type: Date,
        default: Date.now
    },
    lastEdited: { 
        type: Date,
        default: Date.now
    },
});

module.exports(userSchema);