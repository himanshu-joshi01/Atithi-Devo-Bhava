const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//add reviews

router.post("/",
    isLoggedIn,   //make sure user is logged in before they can add a review    
    validateReview,
    wrapAsync(reviewController.createReview)
);

//Delete Review

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;