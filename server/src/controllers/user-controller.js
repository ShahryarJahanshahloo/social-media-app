const Tweet = require('../models/tweet')
const User = require('../models/user')

async function ping(req, res) {
    res.status(200).send({ ping: "pong" })
}

async function post_signin(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) return res.status(404).send({ error: 'User not found' })
        const token = await user.generateAuthToken()
        res.status(200).send({
            token,
            username: user.username,
            displayName: user.displayName,
        })
    } catch (e) { res.status(500).send({ e }) }
}

async function post_signup(req, res) {
    const validKeys = ["displayName", "email", "password", "username"]
    const isValidOperation = JSON.stringify(Object.keys(req.body).sort()) == JSON.stringify(validKeys)
    if (!isValidOperation) return res.status(400).send({ e: "invalid operation" })
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({
            token,
            username: user.username,
            displayName: user.displayName,
        })
    } catch (e) { res.status(500).send({ e }) }
}

async function patch_follow(req, res) {
    try {
        const message = await User.toggleFollow(req.user, req.body.username)
        res.status(200).send({ message })
    } catch (e) { res.status(500).send({ e }) }
}

async function get_followers(req, res) {
    const username = req.query.username
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).send()
        const options = {
            skip: +req.query.skip,
            limit: 10,
        }
        await user.populate({
            path: "followers",
            options,
            select: {
                username: 1,
                displayName: 1,
                bio: 1,
                _id: 0
            }
        }).execPopulate()
        res.status(200).send({ users: user.followers })
    } catch (e) {
        res.status(500).send()
    }
}

async function get_followings(req, res) {
    const username = req.query.username
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).send()
        const options = {
            skip: +req.query.skip,
            limit: 10,
        }
        await user.populate({
            path: "followings",
            options,
            select: {
                username: 1,
                displayName: 1,
                bio: 1,
                _id: 0
            }
        }).execPopulate()
        res.status(200).send({ users: user.followings })
    } catch (e) {
        res.status(500).send()
    }
}

async function get_profileInfo(req, res) {
    const username = req.query.username
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).send({ error: "user not found!" })
        res.status(200).send({
            username: user.username,
            bio: user.bio,
            displayName: user.displayName,
            tweetsCount: user.tweetsCount,
            followersCount: user.followers.length,
            followingsCount: user.followings.length,
        })
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function get_userInfo(req, res) {
    const user = req.user
    try {
        if (!user) res.status(404).send({ e: "user not found" })
        const retweets = await Tweet.find({
            user: user._id,
            tweetType: "retweet"
        }, "retweetData")
        res.status(200).send({
            username: user.username,
            displayName: user.displayName,
            likes: user.likes,
            retweets: retweets,
            followings: user.followings
        })
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function post_settings_profile(req, res) {
    try {
        const validKeys = ["bio", "displayName"]
        const keys = Object.keys(req.body)
        const isValidOperation = keys.every((item) => {
            if (validKeys.includes(item)) return true
            else return false
        })
        if (isValidOperation) {
            await User.updateOne({ username: req.user.username }, {
                ...req.body
            })
            res.status(200).send({ m: "new settings set successfully!" })
        } else throw new Error("invalid body!")
    } catch (e) {
        res.status(500).send()
    }
}

async function get_search(req, res) {
    try {
        const query = req.query.query
        const users = await User.find({ username: new RegExp(query) },
            "bio username displayName _id",
            {
                skip: 0,
                limit: 10
            })
        // if (!users) return res.status(404).send()
        res.status(200).send({ users })
    } catch (e) {
        res.status(500).send()
    }
}

async function post_logout(req, res) {
    try {
        req.user.tokens.pull(req.token._id)
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

async function post_authenticate(req, res) {
    try { res.status(200).send({ isAuthenticated: true }) }
    catch (e) { res.status(500).send({ e }) }
}

async function post_uploadAvatar(req, res) {
    try {
        req.user.avatar = req.file.buffer
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

async function get_getAvatar(req, res) {
    try {
        const user = await User.findOne({ username: req.query.username })
        if (!user || !user.avatar) throw new Error()
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(500).send()
    }
}

async function get_profileRetweets(req, res) {
    try {
        const user = await User.findOne({ username: req.query.username })
        const retweets = await Tweet.find({
            user: user._id,
            tweetType: "retweet"
        },
            "retweetData",
            {
                limit: 10,
                skip: +req.query.skip,
                sort: {
                    createdAt: -1
                }
            })
        res.status(200).send({ retweets })
    } catch (e) {
        res.status(500).send()
    }
}

async function delete_deleteAvatar(req, res) {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

async function delete_deleteUser(req, res) {
    try {
        const userTweets = await Tweet.find({
            user: req.user._id,
            tweetType: {
                $in: ["original", "reply"]
            }
        })
        for (const tweet of userTweets) {
            if (tweet.retweetCount != 0) {
                await Tweet.deleteMany({ retweetData: tweet._id })
            }
            if (tweet.tweetType == "reply") {
                const targetTweet = await Tweet.findById(tweet.replyTo)
                if (targetTweet) {
                    targetTweet.repliesCount -= 1
                    await targetTweet.save()
                }
            }
        }
        await Tweet.deleteMany({ user: req.user._id })
        const deletedUser = await User.deleteOne({ _id: req.user._id })
        res.status(200).send(deletedUser)
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function get_profileLikes(req, res) {
    try {
        const user = await User.findOne({ username: req.query.username })
        if (!user) return res.status(404).send()
        const options = {
            skip: +req.query.skip,
            limit: 10,
            select: {
                updatedAt: 0,
                __v: 0,
            },
            sort: {
                createdAt: -1,
            },
        }
        await user.populate({
            path: "likes",
            options,
            populate: {
                path: "user",
                select: {
                    username: 1,
                    displayName: 1,
                    _id: 0,
                    password: 0,
                }
            }
        }).execPopulate()
        res.status(200).send({ tweets: user.likes })
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    ping,
    post_signin,
    post_signup,
    patch_follow,
    get_followers,
    get_followings,
    get_userInfo,
    get_profileInfo,
    get_profileRetweets,
    get_profileLikes,
    post_settings_profile,
    get_search,
    post_logout,
    post_authenticate,
    post_uploadAvatar,
    get_getAvatar,
    delete_deleteAvatar,
    delete_deleteUser,
}