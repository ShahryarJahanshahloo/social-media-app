const Tweet = require('../models/tweet')

async function get_home(req, res) {
    try {
        const tweets = await Tweet
            .find({ user: { $in: req.user.homeTweetIDs } }, "likesNumber body user createdAt", {
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
        }
        res.status(200).send({ tweets })
    } catch (e) {
        res.status(400).send({ e })
    }
}

async function post_compose(req, res) {
    const isValidOperation = JSON.stringify(Object.keys(req.body)) == JSON.stringify(["body"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    const tweet = new Tweet({
        ...req.body,
        user: req.user._id
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
        if (!tweet.user.equals(req.user._id)) return res.status(400).send()
        const deletedTweet = await Tweet.deleteOne({ _id: req.body.tweetID })
        res.status(200).send(deletedTweet)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function patch_edit_tweet(req, res) {
    //keys should be in the same order: needs update!
    const isValidOperation = JSON.stringify(Object.keys(req.body)) == JSON.stringify(["body", "tweetID"])
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    try {
        const tweet = await Tweet.findOne({ _id: req.body.tweetID, user: req.user._id })
        if (!tweet) return res.status(404).send()
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
                likesNumber: 1,
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
                    _id: 0
                }
            }
        }).execPopulate()
        res.send({ tweets: req.user.bookmarks })
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
}