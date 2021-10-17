const express = require("express")
const auth = require("../middleware/auth")
const controller = require("../controllers/user-controller")
const router = new express.Router()

router.get("/ping", controller.ping)

//SIGN-IN
router.post("/sign-in", controller.post_sign_in)

//SIGN-UP
router.post("/sign-up", controller.post_sign_up)

//FOLLOW BUTTON
router.patch("/follow", auth, controller.patch_follow)

//SHOW FOLLOWERS
//needs pagination and profile pics
router.get("/followers", auth, controller.get_followers)

//SHOW FOLLOWINGS
//needs pagination and profile pics
router.get("/followings", auth, controller.get_followings)

//VIEW PROFILE
router.get("/profile/:username", controller.get_profile_username)

//EDIT PROFILE
router.post("/settings/profile", auth, controller.post_settings_profile)

//LOGOUT
router.post("/logout", auth, controller.post_logout)

//SEARCH
router.get("/search", controller.get_search)

//suggestions
//suggestions-extended

module.exports = router