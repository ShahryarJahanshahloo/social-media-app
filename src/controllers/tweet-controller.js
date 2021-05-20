const User = require('../models/user')
const Tweet = require('../models/tweet')

module.exports.get_home = async (req, res) => {
    const followings = req.user.followings
    followings.push(req.user._id)
    const options = {
        skip: req.params.skip,
        limit: 5,
        sort: {
            createdAt: -1
        },
    }
    await req.user.populate({
        path: "tweets",
        match: {
            owner: { $in: followings }
        },
        options,
    }).execPopulate()
    res.send(req.user.tweets)
}

module.exports.post_compose = async (req, res) => {
    const tweet = new Tweet({
        ...req.body,
        owner: req.user._id
    })
    try {
        await tweet.save()
        res.status(200).send(tweet)
    } catch (e) {
        res.status(500).send(e)
    }
}


module.exports.delete_delete_tweet = async (req, res) => {
    const tweet = await Tweet.findById(req.body.tweetID)
    try {

        if (tweet.owner != req.user._id) {
            res.status(400).send({ error: "you are not authenticated" })
        }
        const deletedTweet = await Tweet.deleteOne({ _id: req.body.tweetID })
        res.send(deletedTweet)

    } catch (e) {
        res.status(500).send(e)
    }

}


module.exports.patch_edit_tweet = async (req, res) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => update == "body")
    if (!isValidOperation) return res.status(400).send({ error: "Invalid update!" })

    try {
        const tweet = await Tweet.findOne({ _id: req.body.tweetID, owner: req.user._id })
        if (!tweet) return res.status(404).send()
        tweet.body = req.body.body
        await tweet.save()
        res.send(tweet)

    } catch (e) {
        res.status(500).send()
    }
}


module.exports.patch_like = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.body.tweetID)
        const isLiked = await req.user.likes.includes(req.body.tweetID)
        if (isLiked) {
            req.user.likes = req.user.likes.filter(item => item !== req.body.tweetID)
            await req.user.save()
            tweet.likes -= 1
            tweet.save()
        } else {
            req.user.likes.push(req.body.tweetID)
            await req.user.save()
            tweet.likes += 1
            tweet.save()
        }
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
}


module.exports.patch_bookmark = async (req, res) => {
    try {
        const isBookmarked = await req.user.bookmarks.includes(req.body.tweetID)
        if (isBookmarked) {
            req.user.bookmarks = req.user.bookmarks.filter(item => item !== req.body.tweetID)
            await req.user.save()
        } else {
            req.user.bookmarks.push(req.body.tweetID)
            await req.user.save()
        }
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
}


module.exports.get_bookmarks = async (req, res) => {
    const bookmarks = req.user.bookmarks
    try {
        const options = {
            skip: req.params.skip,
            limit: 10,
            sort: -1,
        }
        await req.user.populate({
            path: "bookmarks",
            match: {
                owner: { $in: bookmarks }
            },
            options,
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (e) {
        res.status(500).send()
    }

}
