const Tweet = require('../models/tweet')

async function get_home(req, res) {
    // try {
    //     const tweets = await Tweet
    //         .find({ user: { $in: req.user.homeUserIDs }, tweetType: "original" },
    //             "likesCount body user createdAt repliesCount retweetCount",
    //             {
    //                 skip: +req.query.skip,
    //                 limit: 10,
    //                 sort: {
    //                     createdAt: -1
    //                 }
    //             })
    //     for (const tweet of tweets) {
    //         await tweet.populate({
    //             path: "user",
    //             select: {
    //                 username: 1,
    //                 displayName: 1,
    //                 avatar: 1,
    //                 _id: 0
    //             }
    //         }).execPopulate()
    //     }
    //     res.status(200).send({ tweets })
    // } catch (e) {
    //     res.status(500).send({ e })
    // }
}

async function post_compose(req, res) {
    const isValidOperation = JSON.stringify(Object.keys(req.body)) == JSON.stringify(["body"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    const tweet = new Tweet({
        ...req.body,
        user: req.user._id,
    })
    try {
        await tweet.save()
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
        const deletedTweet = await Tweet.deleteOne({ _id: req.body.tweetID })
        res.status(200).send(deletedTweet)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function patch_edit_tweet(req, res) {
    // order of keys may matter
    const isValidOperation = JSON.stringify(Object.keys(req.body).sort()) == JSON.stringify(["body", "tweetID"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    try {
        const tweet = await Tweet.findOne({ _id: req.body.tweetID })
        if (!tweet) return res.status(404).send()
        if (!tweet.user.equals(req.user._id)) return res.status(400).send()
        tweet.body = req.body.body
        await tweet.save()
        res.status(200).send(tweet)
    } catch (e) {
        res.status(500).send()
    }
}

async function patch_like(req, res) {
    try {
        const message = await Tweet.toggleLikeTweets(req.user, req.body.tweetID)
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
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

async function get_getReplies(req, res) {
    try {
        const replies = await Tweet.find({ replyTo: req.body.tweetID },
            "likesCount body user createdAt repliesCount retweetCount",
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
                    avatar: 1,
                    _id: 0
                }
            }).execPopulate()
        }
        res.status(200).send(replies)
    } catch (e) {
        res.status(500).send()
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
    post_reply,
    get_getReplies,
    post_retweet,
}