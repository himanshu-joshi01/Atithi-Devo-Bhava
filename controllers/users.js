const User = require("../models/user.js");


module.exports.signupForm=(req, res) => {
    res.render("user/signup.ejs");
}


module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser,(err)=>{
         if(err){
            return next(err);
         }
         req.flash("success", `Hi ${username}, Welcome To Atithi Devo Bhava`);
         res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', "Username Already Exist");
        res.redirect('/signup');
    }
}


module.exports.loginForm=(req, res) => {
    res.render("user/login.ejs");
}


module.exports.login=async (req, res) => {
    req.flash("success",`Hi  ${req.user.username}! Welcome back.`);
    res.redirect("/listings");
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
    if(err){
       return next(err);
    }
    })  
    req.flash("success",'Hi  Welcome back.');
    res.redirect("/") ;
   
}


module.exports.showProfile = async (req, res) => {
    let { id } = req.params;
    let user= await User.findById(id).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }) 
    let stat= await User.findById(id).populate('followers').populate("followings"); 
    if (!user) {
        req.flash("error", 'No User found');
        return res.redirect("/home");
    }
    res.render("user/profile.ejs",{user,stat});    

}

module.exports.editProfileForm = async (req, res) => {
    let { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash("error", 'Profile you requested for Does not Exist!');
        return res.redirect("/profile");
    }
    // let originalImageUrl = user.image.url;
    // originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("user/editProfile.ejs", { user });
}


module.exports.updateProfile = async (req, res) => {

    let { id } = req.params;
    let user = await User.findById(id);
    if(user){

        if(!user._id.equals(res.locals.currUser._id)){
          
            req.flash("error","You are not authorized to edit this profile!");
                return res.redirect(`/profile`);
        }
    user = await User.findByIdAndUpdate(id, { ...req.body.user });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        user.profileImage = { url, filename };
        await user.save();
     
    }
    req.flash('success', `Successfully updated`);
    res.redirect(`/profile/${id}`);
}
}

module.exports.follow =async(req, res)=>{ 
    let { id } = req.params;

    let following = await User.findById(id);
    let follower=await User.findById(req.user._id);
    following.followers.push(follower);
    follower.followings.push(following);
    await follower.save();
    await  following.save();
 
    res.redirect(`/profile/${id}`);
}

module.exports.unfollow =async(req, res)=>{ 
    let { id } = req.params;
    let following = await User.findById(id);
    let follower=await User.findById(req.user._id);
    following.followers.splice(following.followers.indexOf(req.user._id),1)
    follower.followings.splice(follower.followings.indexOf(id),1)
    await  following.save();
    await  follower.save();
    res.redirect(`/profile/${id}`);
}



