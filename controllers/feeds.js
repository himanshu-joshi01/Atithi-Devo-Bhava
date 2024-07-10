const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const User=require('../models/user');


module.exports.feeds=async(req, res) => {
    let posts= await Post.find()    
                        .populate("author").populate("likes")
                        .populate("comment")  //get user info for each post
                        .sort([["createdAt","desc"]])
                        .lean().exec();
    res.render("listings/feed.ejs",{posts});
}

module.exports.newPost=async(req,res)=>{
    let {post}=req.body;
       const newPost = new Post(post);   
     newPost.author=req.user._id;
     if (typeof req.file !== 'undefined') {
         let url = req.file.path;
         let filename = req.file.filename;
         newPost.postImage = { url, filename };
     }  
       SavedPost=await newPost.save();
       req.flash("success",` Post created`);
       res.redirect("/feeds");
    }

module.exports.like=async(req,res)=>{ 
    let { postid } = req.params;
    let post= await Post.findById(postid);
    let like= await User.findById(req.user._id);
    post.likes.push(like);
    await post.save();
    // res.redirect(`/feeds/#${postid}`);
    res.redirect(`/feeds/#${postid}`);
}

module.exports.unLike=async(req,res)=>{ 
  
   let { postid } = req.params;
   let post= await Post.findById(postid);
   post.likes.splice(post.likes.indexOf(req.user._id),1);
   await  post.save();
//    res.redirect(`/feeds/#${postid}`);
res.redirect(`/feeds/#${postid}`);

}

module.exports.comment=async(req,res)=>{ 
  
    let { postid } = req.params;
    let post= await Post.findById(postid);
    let newComment=new Comment(req.body) ;
    newComment.text=req.body.comment;
    newComment.author=req.user;
    post.comment.push(newComment);
    await newComment.save();
    await post.save();
    res.redirect(`/feeds/#${postid}`);
   
 }
 
