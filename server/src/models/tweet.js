const mongoose = require('mongoose')
const User = require('./user')

const tweetSchema = mongoose.Schema({
    body: {
        type: String,
        required: false,
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
    retweetData: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Tweet"
    },
    likesCount: {
        type: Number,
        required: false,
        default: 0,
    },
    repliesCount: {
        type: Number,
        required: false,
        default: 0,
    },
    retweetCount: {
        type: Number,
        required: false,
        default: 0,
    },
}, {
    timestamps: true,
})

tweetSchema.statics = {
    toggleRetweet: async (user, tweetID) => {
        const retweet = await Tweet.findOne({
            tweetType: "retweet",
            user: user._id,
            retweetData: tweetID
        })
        if (!retweet) {
            const newTweet = new Tweet({
                user: user._id,
                tweetType: "retweet",
                retweetData: tweetID
            })
            const targetTweet = await Tweet.findById(tweetID)
            targetTweet.retweetCount += 1
            await targetTweet.save()
            await newTweet.save()
            return "added retweet"
        } else {
            await Tweet.findByIdAndDelete(retweet._id)
            const targetTweet = await Tweet.findById(tweetID)
            targetTweet.retweetCount -= 1
            await targetTweet.save()
            return "removed retweet"
        }
    }
}

tweetSchema.pre("remove", async function (next) {
})

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet