const User = require("../models/user.js");


module.exports.createListing = async (req, res) => {
    // let url = req.file.path;
    // let filename = req.file.filename;
    let { post } = req.body;
    const newPost = new Listing(post);
    newPost.author = req.user._id;
    newPost.image = { url, filename };
    SavedListing=await newPost.save();
    req.flash("success", `${listing.title} is created`);
    res.redirect("/feed");
}