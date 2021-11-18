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
            avatar: user.avatar,
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
            avatar: user.avatar,
        })
    } catch (e) { res.status(500).send({ e }) }
}

async function patch_follow(req, res) {
    try {
        const message = await User.toggleFollow(req.user, req.body._id)
        res.status(200).send({ message })
    } catch (e) { res.status(500).send({ e }) }
}

async function get_followers(req, res) {
    const username = req.body.username
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
                avatar: 1,
                _id: 0
            }
        }).execPopulate()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

async function get_followings(req, res) {
    const username = req.body.username
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
                avatar: 1,
                _id: 0
            }
        }).execPopulate()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

async function get_profileInfo(req, res) {
    const username = req.body.username
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).send({ error: "user not found!" })
        res.status(200).send({
            username: user.username,
            bio: user.bio,
            displayName: user.displayName,
            avatar: user.avatar,
            tweetsCount: user.tweetsCount,
            followersNumber: user.followersNumber.length,
            followingsNumber: user.followingsNumber.length,
        })
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function get_profileTweets(req, res) {
    try {
        const user = await User.findOne({ username: req.query.username })
        if (!user) return res.status(404).send({ error: "user not found!" })
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
            path: "tweets",
            options,
        }).execPopulate()
        res.status(200).send({ tweets: user.tweets })
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function get_userInfo(req, res) {
    const user = req.user
    try {
        if (user) res.status(404).send({ e: "user not found" })
        res.status(200).send({
            username: user.username,
            displayName: user.displayName,
            avatar: user.avatar,
        })
    } catch (e) { res.status(500).send({ e }) }
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
        const query = req.body.query
        const result = await User.find({ username: new RegExp(query) },
            "bio username displayName avatar",
            {
                skip: 0,
                limit: 10
            })
        if (!result) return res.status(404).send()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send()
    }
}

async function post_logout(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
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

module.exports = {
    ping,
    post_signin,
    post_signup,
    patch_follow,
    get_followers,
    get_followings,
    get_userInfo,
    get_profileInfo,
    get_profileTweets,
    post_settings_profile,
    get_search,
    post_logout,
    post_authenticate,
    post_uploadAvatar,
}