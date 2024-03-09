const Listing=require("./models/listing.js");  
const Review=require("./models/review.js");  
const { reviewSchema,listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js")



module.exports.isLoggedIn = (req, res, next) => {
   if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect('/home');
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    listing=await Listing.findById(id);
    if(listing){
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not a Owner")
            return res.redirect(`/listings/${id}`);
    }
}
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id, reviewId }=req.params;
    let review=await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currUser._id)){
            req.flash('error','You are not the author of this review');
            return res.redirect(`/listings/${id}`);
        }
        next();
}