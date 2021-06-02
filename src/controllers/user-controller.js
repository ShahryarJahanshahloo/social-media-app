const User = require('../models/user')
const Tweet = require('../models/tweet')

module.exports.post_sign_in = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) return res.status(404).send({ error: 'User not found' })
        const token = await user.generateAuthToken()
        res.status(200).send({ token })
    } catch (e) {
        res.status(500).send({ e })
    }
}


module.exports.post_sign_up = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({ token })
    } catch (e) {
        res.status(400).send({ e })
    }
}


module.exports.patch_follow = async (req, res) => {
    try {
        const targetUser = await User.findOne({ _id: req.body._id})
        const isFollowed = req.user.followings.includes(req.body._id)
        let message;
        if (isFollowed) {
            req.user.followings.splice(req.user.followings.indexOf(req.body._id), 1)
            await req.user.save()
            targetUser.followers.splice(targetUser.followers.indexOf(req.user._id), 1)
            console.log(targetUser);
            await targetUser.save()
            message = "user unfollowed!"
        } else {
            req.user.followings.push(req.body._id)
            await req.user.save()
            targetUser.followers.push(req.user._id)
            await targetUser.save()
            message = "user followed!"
        }
        res.status(200).send({ message, })
    } catch (e) {
        console.log(e);
        res.status(500).send({ e })
    }

}

module.exports.get_followers = async (req, res) => {
    //must show username, displayname, avatar, bio
    const options = {
        skip: +req.query.skip,
        limit: 10,
    }
    await req.user.populate({
        path: "followers",
        options,
    }).execPopulate()

    console.log(req.user.followers);
    res.status(200).send(req.user.followers)
}

module.exports.get_followings = async (req, res) => {
    //must show username, displayname, avatar, bio
    const options = {
        skip: +req.query.skip,
        limit: 10,
    }
    await req.user.populate({
        path: "followings",
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
                sort: {
                    createdAt: -1
                },
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