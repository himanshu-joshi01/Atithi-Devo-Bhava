const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController= require("../controllers/users.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });  





router.route("/signup")
.get(userController.signupForm)  
.post(wrapAsync(userController.signup) );


router.route("/login")
.get(userController.loginForm)
.post(
 passport.authenticate("local", { 
failureRedirect: '/login', 
failureFlash: true 
}), 
userController.login
);


router.route("/profile/:id/edit")
.get(isLoggedIn,
    wrapAsync(userController.editProfileForm));
    
router.route("/profile/:id")
.get(
    wrapAsync(userController.showProfile))
.put(
    isLoggedIn,
    upload.single('user[profileImage]'),
    wrapAsync(userController.updateProfile)
    );

    router.route("/profile/:id/follow")
    .post(
        isLoggedIn,
        wrapAsync(userController.follow)
    );

    router.route("/profile/:id/unfollow")
    .post(
        isLoggedIn,
        wrapAsync(userController.unfollow)
    );

    //-------------------------
// Follow / Unfollow User


router.get("/logout", userController.logout);


module.exports = router; 