const Tweet = require('../models/tweet')
const User = require('../models/user')

async function get_home(req, res) {
    try {
        const tweets = await Tweet.find({
            $or: [{
                user: { $in: req.user.homeUserIDs }, tweetType: "original"
            }, {
                user: { $in: req.user.followings }, tweetType: "retweet"
            }]
        },
            "likesCount body user createdAt repliesCount retweetCount retweetData tweetType",
            {
                skip: +req.query.skip,
                limit: 10,
                sort: {
                    createdAt: -1
                }
            })
        for (const tweet of tweets) {
            await tweet.populate({
                path: "user",
                select: {
                    username: 1,
                    displayName: 1,
                    _id: 0
                }
            }).execPopulate()
            if (tweet.tweetType == "retweet") {
                await tweet.populate({
                    path: "retweetData",
                    select: {
                        likesCount: 1,
                        body: 1,
                        user: 1,
                        createdAt: 1,
                        repliesCount: 1,
                        retweetCount: 1,
                    },
                    populate: {
                        path: "user",
                        select: {
                            username: 1,
                            displayName: 1,
                            _id: 0
                        }
                    }
                }).execPopulate()
            }
        }
        res.status(200).send({ tweets })
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function post_compose(req, res) {
    const isValidOperation = JSON.stringify(Object.keys(req.body)) == JSON.stringify(["body"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    const tweet = new Tweet({
        body: req.body.body,
        user: req.user._id,
        tweetType: "original"
    })
    try {
        await tweet.save()
        req.user.tweetsCount++
        await req.user.save()
        res.status(200).send(tweet)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function delete_delete_tweet(req, res) {
    const tweet = await Tweet.findOne({ _id: req.body.tweetID })
    try {

        if (!tweet) return res.status(404).send()
        if (!tweet.user.equals(req.user._id)) return res.status(400).send()

        if (tweet.tweetType == "original") {
            req.user.tweetsCount -= 1
            await req.user.save()
        }

        if (tweet.tweetType == "reply") {
            const targetTweet = await Tweet.findById(tweet.replyTo)
            targetTweet.repliesCount -= 1
            await targetTweet.save()
        }

        await Tweet.deleteMany({ retweetData: tweet._id })
        const deletedTweet = await Tweet.deleteOne({ _id: req.body.tweetID })
        res.status(200).send(deletedTweet)

    } catch (e) {
        res.status(500).send(e)
    }
}

async function patch_edit_tweet(req, res) {
    const isValidOperation = JSON.stringify(Object.keys(req.body).sort()) == JSON.stringify(["body", "tweetID"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    try {
        const tweet = await Tweet.findOne({ _id: req.body.tweetID })
        if (!tweet) return res.status(404).send()
        if (!tweet.user.equals(req.user._id)) return res.status(400).send()
        if (tweet.tweetType == "retweet") return res.status(400).send()
        tweet.body = req.body.body
        await tweet.save()
        res.status(200).send(tweet)
    } catch (e) {
        res.status(500).send()
    }
}

async function patch_like(req, res) {
    try {
        const tweetID = req.body.tweetID
        const tweet = await Tweet.findById(tweetID)
        const isLiked = req.user.likes.includes(tweet._id)
        let message;
        if (isLiked) {
            req.user.likes.pull(tweet._id)
            await req.user.save()
            tweet.likesCount -= 1
            await tweet.save()
            message = "removed"
        } else {
            req.user.likes.push(tweet._id)
            await req.user.save()
            tweet.likesCount += 1
            await tweet.save()
            message = "added"
        }
        res.status(200).send({ message })
    } catch (e) {
        res.status(500).send(e)
    }
}

async function patch_bookmark(req, res) {
    try {
        const message = await req.user.toggleBookmarkTweet(req.body.tweetID)
        res.status(200).send({ message })
    } catch (e) {
        res.status(500).send(e)
    }
}

async function get_bookmarks(req, res) {
    try {
        const options = {
            skip: +req.query.skip,
            limit: 10,
            sort: {
                createdAt: -1
            },
            select: {
                body: 1,
                user: 1,
                likesCount: 1,
                retweetCount: 1,
                repliesCount: 1,
                createdAt: 1,
            }
        }
        await req.user.populate({
            path: "bookmarks",
            options,
            populate: {
                path: "user",
                select: {
                    username: 1,
                    displayName: 1,
                    avatar: 1,
                    _id: 0
                }
            }
        }).execPopulate()
        res.send({ tweets: req.user.bookmarks })
    } catch (e) {
        res.status(500).send()
    }
}

async function get_profileTweets(req, res) {
    try {
        const user = await User.findOne({ username: req.query.username }, "_id")
        const tweets = await Tweet.find({
            user: user._id,
            tweetType: {
                $in: ["original", "retweet"]
            }
        },
            "likesCount body user createdAt repliesCount retweetCount retweetData tweetType",
            {
                skip: +req.query.skip,
                limit: 10,
                sort: {
                    createdAt: -1
                }
            })
        for (const tweet of tweets) {
            await tweet.populate({
                path: "user",
                select: {
                    username: 1,
                    displayName: 1,
                    _id: 0
                }
            }).execPopulate()
            if (tweet.tweetType == "retweet") {
                await tweet.populate({
                    path: "retweetData",
                    select: {
                        likesCount: 1,
                        body: 1,
                        user: 1,
                        createdAt: 1,
                        repliesCount: 1,
                        retweetCount: 1,
                    },
                    populate: {
                        path: "user",
                        select: {
                            username: 1,
                            displayName: 1,
                            _id: 0
                        }
                    }
                }).execPopulate()
            }
        }
        res.status(200).send({ tweets })
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function post_retweet(req, res) {
    try {
        const message = await Tweet.toggleRetweet(req.user, req.body.tweetID)
        res.status(200).send({ message })
    } catch (e) {
        res.status(500).send()
    }
}

async function post_reply(req, res) {
    const isValidOperation = JSON.stringify(Object.keys(req.body).sort()) == JSON.stringify(["body", "tweetID"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    const tweet = new Tweet({
        body: req.body.body,
        user: req.user._id,
        tweetType: "reply",
        replyTo: req.body.tweetID,
    })
    try {
        await tweet.save()
        const targetTweet = await Tweet.findById(req.body.tweetID)
        targetTweet.repliesCount += 1
        await targetTweet.save()
        res.status(200).send({ message: "reply was successful" })
    } catch (e) {
        res.status(500).send()
    }
}

async function get_getReplies(req, res) {
    try {
        const replies = await Tweet.find({ replyTo: req.query.tweetID },
            "likesCount body user createdAt repliesCount retweetCount tweetType",
            {
                skip: +req.query.skip,
                limit: 10,
                sort: {
                    createdAt: -1
                }
            })
        for (const reply of replies) {
            await reply.populate({
                path: "user",
                select: {
                    username: 1,
                    displayName: 1,
                    _id: 0
                }
            }).execPopulate()
        }
        res.status(200).send({ tweets: replies })
    } catch (e) {
        res.status(500).send()
    }
}

async function get_tweetInfo(req, res) {
    try {
        const tweet = await Tweet.findById(req.query.tweetID,
            "likesCount body user createdAt repliesCount retweetCount retweetData tweetType")
        if (!tweet) return res.status(400).send()
        await tweet.populate({
            path: "user",
            select: {
                username: 1,
                displayName: 1,
                avatar: 1,
                _id: 0
            }
        }).execPopulate()
        res.status(200).send(tweet)
    } catch (e) {
        res.status(500).send({ e })
    }
}

module.exports = {
    get_home,
    post_compose,
    delete_delete_tweet,
    patch_edit_tweet,
    patch_like,
    patch_bookmark,
    get_bookmarks,
    get_profileTweets,
    post_reply,
    get_getReplies,
    post_retweet,
    get_tweetInfo,
}