const User = require('../models/user')

async function ping(req, res) {
    res.status(200).send({ ping: "pong" })
}

async function post_sign_in(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) return res.status(404).send({ error: 'User not found' })
        const token = await user.generateAuthToken()
        res.status(200).send({
            token,
            username: user.username,
            displayName: user.displayName
        })
    } catch (e) { res.status(500).send({ e }) }
}

async function post_sign_up(req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({
            token,
            username: user.username,
            displayName: user.displayName
        })
    } catch (e) { res.status(400).send({ e }) }
}

async function patch_follow(req, res) {
    try {
        const message = await User.toggleFollow(req.user, req.body._id)
        res.status(200).send({ message })
    } catch (e) { res.status(500).send({ e }) }
}

async function get_followers(req, res) {
    const options = {
        skip: +req.query.skip,
        limit: 10,
    }
    await req.user.populate({
        path: "followers",
        options,
        select: {
            username: 1,
            displayName: 1,
            bio: 1,
            _id: 0
        }
    }).execPopulate()
    res.status(200).send(req.user.followers)
}

async function get_followings(req, res) {
    const options = {
        skip: +req.query.skip,
        limit: 10,
    }
    await req.user.populate({
        path: "followings",
        options,
        select: {
            username: 1,
            displayName: 1,
            bio: 1,
            _id: 0
        }
    }).execPopulate()
    res.send(req.user.followings)
}

async function get_profileTweets(req, res) {
    const user = await User.findOne({ username: req.query.username },)
    try {
        if (user) {
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
            res.status(200).send({
                tweets: user.tweets,
                username: user.username,
                bio: user.bio,
                displayName: user.displayName,
                followers: user.followers.length,
                followings: user.followings.length
            })
        } else {
            return res.status(404).send({ error: "user not found!" })
        }
    } catch (e) {
        res.status(500).send({ e })
    }
}

async function get_profileInfo(req, res) {
    const user = req.user
    try {
        if (user) {
            res.status(200).send({
                username: user.username,
                displayName: user.displayName,
            })
        } else {
            res.status(404).send("no user found")
        }
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
            await req.user.save()
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
            "bio username displayName",
            {
                skip: 0,
                limit: 10
            })
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

module.exports = {
    ping,
    post_sign_in,
    post_sign_up,
    patch_follow,
    get_followers,
    get_followings,
    get_profileInfo,
    get_profileTweets,
    post_settings_profile,
    get_search,
    post_logout,
    post_authenticate,
}