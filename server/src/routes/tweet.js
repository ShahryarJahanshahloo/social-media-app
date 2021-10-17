'use strict'

const express = require("express")
const auth = require("../middleware/auth")
const controller = require("../controllers/tweet-controller")
const router = new express.Router()

//HOME
router.get('/home', auth, controller.get_home)

//COMPOSE
router.post("/compose", auth, controller.post_compose)

//DELETE TWEET
router.delete("/delete-tweet", auth, controller.delete_delete_tweet)

//EDIT TWEET
router.patch("/edit-tweet", auth, controller.patch_edit_tweet)

//LIKE BUTTON
router.patch("/like", auth, controller.patch_like)

//BOOKMARK BUTTON
router.patch("/bookmark", auth, controller.patch_bookmark)

//SHOW BOOKMARKS
router.get("/bookmarks", auth, controller.get_bookmarks)

module.exports = router