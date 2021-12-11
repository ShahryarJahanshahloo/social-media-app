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
    get_profileRetweets,
    get_profileLikes,
    post_settings_profile,
    post_logout,
    get_search,
    post_uploadAvatar,
    get_getAvatar,
    delete_deleteAvatar,
    delete_deleteUser,
    post_authenticate,
} = require("../controllers/user-controller")

router.get("/ping", ping)
router.post("/signin", post_signin)
router.post("/signup", post_signup)
router.patch("/follow", auth, patch_follow)
router.get("/followers", get_followers)
router.get("/followings", get_followings)
router.post("/uploadAvatar", auth, upload.single('avatar'), post_uploadAvatar, uploadErrorHandler)
router.get("/getAvatar", get_getAvatar)
router.get("/profileLikes", get_profileLikes)
router.get("/profileRetweets", get_profileRetweets)
router.delete("/deleteAvatar", auth, delete_deleteAvatar)
router.delete("/deleteUser", auth, delete_deleteUser)
router.get("/userInfo", auth, get_userInfo)
router.get("/profileInfo", get_profileInfo)
router.post("/settings/profile", auth, post_settings_profile)
router.post("/logout", auth, post_logout)
router.get("/search", get_search)
router.post("/authenticate", auth, post_authenticate)

module.exports = router