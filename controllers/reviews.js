const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const { ClientSession } = require("mongodb");


module.exports.createReview=async (req, res) => {
ClientSession
    
    let listing = await Listing.findById(req.params.id);
    let user= await User.findById(listing.owner._id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    user.reviews.push(newReview)
    await newReview.save();
    await listing.save();
    await user.save();
    req.flash('success', 'Successfully added a review');
    res.redirect(`/listings/${listing.id}`)
}


module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    let listing= await Listing.findById(id);
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await User.findByIdAndUpdate(listing.owner._d, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Review Deleted!");
    res.redirect(`/listings/${id}`);
}

