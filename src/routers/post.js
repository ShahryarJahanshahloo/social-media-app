const express = require("express")
const User = require('../models/user')
const Post = require('../models/post')
const auth = require("../middleware/auth")
const router = new express.Router()


//HOME
router.get('/home', auth, async (req, res) => {
    const followings = req.user.followings
    followings.push(req.user.username)
    const options = {
        page: 1,
        limit: 10,
        sort: { createdAt: -1 },
    }
    await Post.paginate({ username: { $in: followings }}, options, function (err, result) {
        res.send(result)
    })
})


//COMPOSE
router.post("/compose", auth, async (req, res) => {
    const post = new Post(req.body)
    try {
        post.created = new Date()
        await post.save()
        res.status(200).send(post)
    } catch (e) {
        res.status(500).send(e)
    }
})


//DELETE POST
router.delete("/delete-post", auth, async (req, res) => {
    const post = await Post.findById(req.body.postID)
    try {

        if (post.username != req.user.username) {
            res.status(400).send({ error: "you are not authenticated" })
        }
        const deletedPost = await Post.deleteOne({ _id: req.body.postID })
        res.send(deletedPost)

    } catch (e) {
        res.status(500).send(e)
    }
    
})


//EDIT POST
router.patch("/edit-post", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => update == "body")
    if (!isValidOperation) return res.status(400).send({ error: "Invalid update!" })

    try {
        const post = await Post.findOne({ _id: req.body.postID, username: req.user.username })
        if (!post) return res.status(404).send()
        post.body = req.body.body
        await post.save()
        res.send(post)

    } catch (e) {
        res.status(500).send()
    }
})


//LIKE BUTTON
router.patch("/like", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.body.postID)
        const isLiked = await req.user.likes.includes(req.body.postID)
        if (isLiked) {
            req.user.likes = req.user.likes.filter(item => item !== req.body.postID)
            await req.user.save()
            post.likes -= 1
            post.save()
        } else {
            req.user.likes.push(req.body.postID)
            await req.user.save()
            post.likes += 1
            post.save()
        }
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


//BOOKMARK BUTTON
router.patch("/bookmark", auth, async (req, res) => {
    try {
        const isBookmarked = await req.user.bookmarks.includes(req.body.postID)
        if (isBookmarked) {
            req.user.bookmarks = req.user.bookmarks.filter(item => item !== req.body.postID)
            await req.user.save()
        } else {
            req.user.bookmarks.push(req.body.postID)
            await req.user.save()
        }
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})


//SHOW BOOKMARKS
router.get("/bookmarks", auth, async (req, res) => {
    const bookmarks = req.user.bookmarks
    try {
        const options = {
            page: 1,
            limit: 10,
            sort: { createdAt: -1 },
        }
        await Post.paginate({ _id: { $in: bookmarks }}, options, function (err, result) {
            res.send(result)
        })
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router