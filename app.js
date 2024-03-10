if(process.env.NODE_ENV!="production"){
require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const cookieParser= require("cookie-parser");
const session=require("express-session");
const MongoStore= require("connect-mongo");
const flash= require("connect-flash");
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User = require("./models/user.js");
const Post = require("./models/post.js");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });  
const wrapAsync = require("./utils/wrapAsync.js");



const reviewsRouter= require("./routes/review.js");
const listingsRouter= require("./routes/listing.js");
const usersRouter= require("./routes/user.js");
const { MongoAWSError } = require('mongodb');



// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=process.env.ATLASDB_URL;

const store= MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600
})

store.on("error",()=>{
console.log("Error in mongo session store");
});

main()
  .then(() => {
    console.log("connected to DB");
  })

  .catch((err) => {
    console.log(err);
  });

async function main()  {
  await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());

//configure session middleware
app.use(session({
  store,
  secret: process.env.SECRET,
  saveUninitialized: true,
  cookie:{
    expires: Date.now()+7*24*60*60*1000 ,//one week
    maxAge: 7*24*60*60, // one week in ms
    httpOnly: true, //protect against client side scripting
  },
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());  
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;

// routes =============================================================


app.use((req,res,next)=>{
res.locals.success= req.flash("success");
res.locals.error= req.flash("error");
res.locals.currUser = req.user;
res.locals.path= req.url;
res.locals.mode= req.mode;
next();
  
});
  
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",usersRouter);


app.get("/feeds", async(req, res) => {
  let posts= await Post.find({})    
                      .populate("author") 
                      .sort([["createdAt","desc"]])
                      .lean().exec();
                      
  res.render("listings/feed.ejs",{posts});
});

app.post("/feeds", upload.single('postImage'), wrapAsync(async(req,res)=>{
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
}));




app.post("/feeds/:postid/like",async(req, res)=>{ 
  let { postid } = req.params;
  let post= await Post.findById(postid);
  let like= await User.findById(req.user._id);
  post.likes.push(like);
 
  await  post.save();
  res.redirect(`/feeds/#${postid}`);
});

app.post("/feeds/post:id")




app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong"}=err;
  res.status(statusCode).render("listings/error.ejs",{ statusCode,message });
  // res.render("listings/error.ejs",{statusCode,message});
});


app.listen(8080, () => {
  console.log("server is listening to port 8080");
});





