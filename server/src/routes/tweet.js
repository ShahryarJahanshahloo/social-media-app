const express = require("express")
const auth = require("../middleware/auth")
const router = new express.Router()
const {
    get_home,
    post_compose,
    delete_delete_tweet,
    patch_edit_tweet,
    patch_like,
    patch_bookmark,
    post_reply,
    get_getReplies,
    get_bookmarks,
    post_retweet,
} = require("../controllers/tweet-controller")

router.get('/home', auth, get_home)
router.post("/compose", auth, post_compose)
router.delete("/delete-tweet", auth, delete_delete_tweet)
router.patch("/edit-tweet", auth, patch_edit_tweet)
router.post("/reply", auth, post_reply)
router.post("/retweet", auth, post_retweet)
router.get("/getReplies", get_getReplies)
router.patch("/like", auth, patch_like)
router.patch("/bookmark", auth, patch_bookmark)
router.get("/bookmarks", auth, get_bookmarks)

module.exports = router