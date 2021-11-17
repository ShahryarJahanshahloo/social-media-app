const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
        maxlength: 511,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    likesNumber: {
        type: Number,
        default: 0,
    },
    // replies: [{
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             required: true,
    //             ref: "User"
    //         },
    //         body: {
    //             type: String,
    //             maxlength: 255
    //         }
    // }, { timestamps: true }],
    tweetType: {
        type: String,
        required: true,
        default: "original",
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Tweet"
    },
    repliesCount: {
        type: Number,
        default: 0,
    },
    retweetCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

//pre save reply count

tweetSchema.statics = {
    toggleLikeTweet: async (user, tweetID) => {
        const tweet = await Tweet.findById(tweetID)
        const isLiked = await user.likesNumber.includes(tweetID)
        let message;
        if (isLiked) {
            user.likesNumber = user.likesNumber.filter(item => item !== tweetID)
            await user.save()
            tweet.likesNumber -= 1
            await tweet.save()
            message = "removed from liked tweets"
        } else {
            user.likesNumber.push(tweetID)
            await user.save()
            tweet.likesNumber += 1
            await tweet.save()
            message = "added to liked tweets"
        }
        return message
    },
}

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet