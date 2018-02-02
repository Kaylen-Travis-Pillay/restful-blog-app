var express = require("express");
var app = express();
var body_parser = require("body-parser");
var mongoose = require("mongoose");
var method_override = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended: true}));
app.use(method_override("_method"));

mongoose.connect("mongodb://localhost/solution_blog_app");
var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTful routes
// INDEX
app.get("/", function(req, res){
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE
app.post("/blogs", function(req, res){
    Blog.create({
        title: req.body.blog.title,
        body: req.body.blog.body,
        image: req.body.blog.image
    },function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

// SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.render("show", {blog: blog});
        }
    });
});

// EDIT
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.render("edit", {blog: blog});
        }
    });
});

// UPDATE


app.listen(3000, function(){
    console.log("blog server started on port 3000");
});