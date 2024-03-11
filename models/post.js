const mongoose= require ("mongoose");
const Schema= mongoose.Schema;

const postSchema= new Schema({

    postContent: {
        type: String, 
        required: true
    },
    
    author:{

            type: Schema.Types.ObjectId,  
            ref: "User",
            required:true
    },
        
    comment: [
        {type: Schema.Types.ObjectId,
            ref:"Comment"
        }],

    likes:[{
            type:Schema.Types.ObjectId,
            ref:'User'

        }],

    createdAt:{
        type: Date,
        default: Date.now(),
        required:true
    },
    postImage: {
        url: {
            type: String,
           
        },
        filename: {
            type: String,
            default: "default_image_filename.jpg", // Provide a default image filename
        },
    },
    
});

// Method to add a new comment on the review

// const commentSchema = new Schema({
//     text: {
//         type: String,

//     },
//     author: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });


// postSchema.methods={
//     increaseLikeCount:(callback)=> {
//         this.like.count++;
//         this.save(callback);
//     },
//     decreaseLikeCount:(callback)=>{
//        this.like.count-- ;
//        if (this.like.count<0) throw Error("Can not be less than zero!");
//        else{
//            this.save(callback);
//        }    
//     }
// };

// // Method to add a comment on the post
// postSchema.methods.addComment = function(comment){
//     this.comments.push(comment);
//     return this.save();
// }



const Post= mongoose.model('Post', postSchema);
// const Comment= mongoose.model('Comment', commentSchema);

module.exports = Post;
// module.exports = Comment;