const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feeds.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(isLoggedIn,
    wrapAsync(feedController.feeds)
  )
  .post(isLoggedIn,
    upload.single('postImage'),
    wrapAsync(feedController.newPost)
  );


router.route("/:postid/like")
  .post(isLoggedIn,
    wrapAsync(feedController.like)
  );

router.route("/:postid/unlike")
  .post(isLoggedIn,
    wrapAsync(feedController.unLike)
  );

router.route("/:postid/comment")
.post(isLoggedIn,
  wrapAsync(feedController.comment)
  );
//the :postid in the route parameter
module.exports = router; 