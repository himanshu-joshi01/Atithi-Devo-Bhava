const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)


    }).required()
});

module.exports.reviewSchema= Joi.object({
    review :Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),  //rating should be a number between 1 and 5 inclusive 
    comment: Joi.string().required(),
}).required()
});