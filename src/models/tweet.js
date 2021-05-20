const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        maxlength: 511,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
})


const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet