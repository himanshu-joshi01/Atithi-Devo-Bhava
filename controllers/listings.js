const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

};

module.exports.newForm = (req, res) => {
    res.render("listings/new.ejs");
    // res.render("listings/profile.ejs");
}

module.exports.createListing = async (req, res) => {
    let response=await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit:1,
    })
    .send();
    let url = req.file.path;
    let filename = req.file.filename;
    let { listing } = req.body;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry=response.body.features[0].geometry
    SavedListing=await newListing.save();
    req.flash("success", `${listing.title} is created`);
    res.redirect("/listings");
}


module.exports.showListing = async (req, res) => {
 
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", populate: {
                path: "author"
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", 'No listings found');
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });

}


module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", 'Listing you requested for Does not Exist!');
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    listing = await Listing.findById(id);
    listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash('success', `Successfully updated ${listing.title}`);
    res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deleteList = await Listing.findByIdAndDelete(id);
    req.flash('success', `${deleteList.title} has been deleted`);
    res.redirect("/listings");
}

