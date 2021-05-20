const User = require('../models/user')
const Tweet = require('../models/tweet')


module.exports.get_login_status = async (req, res) => {
    res.status(200).send({ isLoggedIn: true })
}

module.exports.post_sign_in = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) return res.status(404).send({ error: 'User not found' })
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send()
    }
}


module.exports.post_sign_up = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

//FIX username should be _id
module.exports.patch_follow = async (req, res) => {
    try {
        const isFollowed = req.user.followings.includes(req.body._id)
        if (isFollowed) {
            req.user.bookmarks = req.user.bookmarks.filter(item => item !== req.body._id)
            await req.user.save()
        } else {
            req.user.followings.push(req.body._id)
            await req.user.save()
        }
        res.send()
    } catch (e) {
        res.status(500).send()
    }

}

module.exports.get_followers = async (req, res) => {
    const followers = req.user.followers
    const options = {
        skip: req.params.skip,
        limit: 10,
    }
    await req.user.populate({
        path: "followers",
        match: {
            owner: { $in: followers }
        },
        options,
    }).execPopulate()
    res.send(req.user.followers)
}

module.exports.get_followings = async (req, res) => {
    const followings = req.user.followings
    const options = {
        skip: req.params.skip,
        limit: 10,
    }
    await req.user.populate({
        path: "followings",
        match: {
            owner: { $in: followings }
        },
        options,
    }).execPopulate()
    res.send(req.user.followings)
}


module.exports.get_profile_username = async (req, res) => {
    const user = await User.findOne({ username: req.params.username })
    try {
        if (user) {
            const options = {
                skip: parseInt(req.query.skip) * 2,
                limit: 2,
            }
            await user.populate({
                path: "tweets",
                options,
            }).execPopulate()
            res.send(user.tweets)
        } else {
            return res.status(404).send()
        }
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }

}

module.exports.post_settings_profile = async (req, res) => {
    try {

        const validKeys = ["password", "bio", "displayName"]
        const keys = Object.keys(req.body)
        const isValidOperation = keys.every((item) => {
            if (validKeys.includes(item)) {
                return true
            }
            else return false
        })
        if (isValidOperation) {
            const user = await User.findOneAndUpdate({
                email: req.user.email
            }, {
                ...req.body
            })
            res.send(user)
        } else throw new Error("invalid body!")
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}

module.exports.post_logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

module.exports.get_search = async (req, res) => {
    try {
        const query = req.body.query
        const result = await User.find({ username: new RegExp(query) })
        console.log(result)
        res.send(result)
    } catch (e) {
        res.status(500).send()
    }
}