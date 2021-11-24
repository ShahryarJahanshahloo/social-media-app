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

tweetSchema.pre("save", async function (next) {
    const tweet = this
    if (tweet.isNew && tweet.tweetType == "original") {
        const user = await User.findById(tweet.user)
        user.tweetsCount += 1
        await user.save()
    }
    next()
})

tweetSchema.pre("remove", async function (next) {
    const tweet = this
    if (tweet.tweetType == "original") {
        const user = await User.findById(tweet.user)
        user.tweetsCount -= 1
        await user.save()
    } else if (tweet.tweetType == "reply") {
        const targetTweet = await Tweet.findById(tweet.replyTo)
        targetTweet.repliesCount -= 1
        await targetTweet.save()
    } else if (tweet.tweetType == "retweet") {
        const targetTweet = await Tweet.findById(tweet.retweetData)
        targetTweet.retweetCount -= 1
        await targetTweet.save()
        next()
    }
    await Tweet.deleteMany({ replyTo: tweet._id })
    next()
})

const Tweet = mongoose.model('Tweet', tweetSchema)
module.exports = Tweet