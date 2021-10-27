'use strict'

const express = require("express")
const auth = require("../middleware/auth")
const router = new express.Router()
const {
    ping,
    post_sign_in,
    post_sign_up,
    patch_follow,
    get_followers,
    get_followings,
    get_profile_username,
    post_settings_profile,
    post_logout,
    get_search,
    post_authenticate,
} = require("../controllers/user-controller")

router.get("/ping", ping)
router.post("/sign-in", post_sign_in)
router.post("/sign-up", post_sign_up)
router.patch("/follow", auth, patch_follow)
router.get("/followers", auth, get_followers)
router.get("/followings", auth, get_followings)
//VIEW PROFILE
router.get("/profile/:username", get_profile_username)
//EDIT PROFILE
router.post("/settings/profile", auth, post_settings_profile)
router.post("/logout", auth, post_logout)
router.get("/search", get_search)
router.get("/authenticate", auth, post_authenticate)

module.exports = router