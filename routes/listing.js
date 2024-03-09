const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });  //for image upload



router.route("/")
    .get(
        wrapAsync(listingController.index)
    )

    .post(
        isLoggedIn,
        upload.single('listing[image]'),   //adds img to req.file
        validateListing,
        wrapAsync(listingController.createListing)
    );

router.get("/new",
    isLoggedIn,
    listingController.newForm
);


router.route("/:id")
    .get(
        wrapAsync(listingController.showListing)
    )

    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )

    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );


router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editForm)
);


module.exports = router;
