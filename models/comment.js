const mongoose= require ("mongoose");
const Schema= mongoose.Schema; 




const commentSchema = new Schema({
    text: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
        
    }
});


const Comment= mongoose.model('Comment', commentSchema);
module.exports = Comment;