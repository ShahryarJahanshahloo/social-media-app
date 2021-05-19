const express = require("express")
const User = require('../models/user')
const Post = require('../models/post')
const auth = require("../middleware/auth")
const router = new express.Router()


//CHECK LOGIN
router.get("/login-status", auth, async (req, res) => {
    res.status(200).send({ isLoggedIn: true })
})


//SIGN-IN
router.post("/sign-in", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) return res.status(404).send({ error: 'User not found' })
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send()
    }
})


//SIGN-UP
router.post("/sign-up", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


//FOLLOW BUTTON
router.patch("/follow", auth, async (req, res) => {
    try {
        const isFollowed = req.user.followings.includes(req.body.username)
        if (isFollowed) {
            req.user.bookmarks = req.user.bookmarks.filter(item => item !== req.body.username)
            await req.user.save()
        } else {
            req.user.followings.push(req.body.username)
            await req.user.save()
        }
        res.send()
    } catch (e) {
        res.status(500).send()
    }

})


//SHOW FOLLOWERS
//needs pagination and profile pics
router.get("/followers", auth, async (req, res) => {
    const followers = req.user.followers
    const options = {
        page: 1,
        limit: 10,
    }
    await User.paginate({ username: { $in: followers } }, options, function (err, result) {
        res.send(result)
    })
})


//SHOW FOLLOWINGS
//needs pagination and profile pics
router.get("/followings", auth, async (req, res) => {
    const followings = req.user.followings
    const options = {
        page: 1,
        limit: 10,
    }
    await User.paginate({ username: { $in: followings } }, options, function (err, result) {
        res.send(result)
    })
})


//VIEW PROFILE
router.get("/profile/:username", auth, async (req, res) => {
    const user = await User.find({ username: req.params.username })
    try {
        if (user) {

            const options = {
                page: 1,
                limit: 10,
            }
            await Post.paginate({ username: req.params.username }, options, function (err, result) {
                res.send({ user, result })
            })

        } else {
            return res.status(404).send()
        }
    } catch (e) {
        res.status(500).send()
    }

})


//EDIT PROFILE
router.post("/settings/profile", auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({
            email: req.user.email
        }, {
            bio: req.body.bio,
            displayName: req.body.displayName,
            password: req.body.password
        })
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


//LOGOUT
router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//SEARCH
router.get("/search", auth, async (req, res) => {
    try {
        const query = req.body.query
        const result = await User.find({ username: new RegExp(query) })
        console.log(result)
        res.send(result)
    } catch (e) {
        res.status(500).send()
    }
})

//suggestions

//suggestions-extended

module.exports = router