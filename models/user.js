const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//Create a new user schema      
let UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: "Add your name",
    },
    location: {
        type: String,
        default: "Add your Address detail",
    },

    about: {
        type: String,
        default: "Add Detail About Yourself",
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other'],  // only allow the values male or
    },

    dob: {
        type: Date,
    },
   
    category: {
        type:String,
        enum: ['Host','Guest', 'Host/Guest'] ,
        },

        language:{
                type : Array,   // define an array of data types
                of : String     // specify that each element in this array is of type string
            },
        

    profileImage: {
        url: {
            type: String,
            default: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg", // Provide a default image URL
        },
        filename: {
            type: String,
            default: "default_image_filename.jpg", // Provide a default image filename
        },
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },

    reviews:[{
        type:  Schema.Types.ObjectId, 
        ref: "Review"
      }],

    followers: [{
        type:Schema.Types.ObjectId, 
        ref:"User"
    }],

    followings: [{
        type:Schema.Types.ObjectId, 
        ref:"User"
    }],
});

UserSchema.plugin(passportLocalMongoose);  //this will add the username and password fields to our database model 

module.exports=mongoose.model("User", UserSchema);