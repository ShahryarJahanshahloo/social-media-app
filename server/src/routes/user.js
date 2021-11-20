const express = require("express")
const auth = require("../middleware/auth")
const { upload, uploadErrorHandler } = require("../middleware/upload")
const router = new express.Router()
const {
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
    post_logout,
    get_search,
    post_uploadAvatar,
    get_getAvatar,
    delete_deleteAvatar,
    post_retweet,
    get_profileRetweets,
    delete_deleteUser,
    post_authenticate,
} = require("../controllers/user-controller")

router.get("/ping", ping)
router.post("/sign-in", post_signin)
router.post("/sign-up", post_signup)
router.patch("/follow", auth, patch_follow)
router.get("/followers", get_followers)
router.get("/followings", get_followings)
router.post("/uploadAvatar", auth, upload.single('avatar'), post_uploadAvatar, uploadErrorHandler)
router.get("/userInfo", auth, get_userInfo)
router.get("/profileInfo", get_profileInfo)
router.get("/profileTweets", get_profileTweets)
router.post("/settings/profile", auth, post_settings_profile)
router.post("/logout", auth, post_logout)
router.get("/search", get_search)
router.post("/authenticate", auth, post_authenticate)

module.exports = router