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
    likesCount: {
        type: Number,
        default: 0,
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
        const isLiked = await user.likes.includes(tweetID)
        let message;
        if (isLiked) {
            user.likes = user.likes.filter(item => item !== tweetID)
            await user.save()
            tweet.likesCount -= 1
            await tweet.save()
            message = "removed from liked tweets"
        } else {
            user.likes.push(tweetID)
            await user.save()
            tweet.likesCount += 1
            await tweet.save()
            message = "added to liked tweets"
        }
        return message
    },
}

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet