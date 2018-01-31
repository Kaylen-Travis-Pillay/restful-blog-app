var express = require("express");
app = express();
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var method_override = require("method-override");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(method_override("_method"));

// MONGOOSE SCHEMA/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: { type: String, default: "https://placeholdit.co//i/250x100?"},
    date: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES
// Index route
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs, blogs});
        }
    });
});

// New route
app.get("/blogs/new", function(req, res){
    res.render("new_post");
});

// Create route
app.post("/blogs", function(req, res){
    Blog.create({
        title: req.body.title,
        body: req.body.body
    }, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

// Show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.render("show_blog", {blog: blog});
        }
    });
});

// Edit route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.render("edit_blog", {blog: blog});
        }
    });
});

// Update route
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        body: req.body.body
    },function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    })
});

// Delete route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

app.listen(3000, function(){
    console.log("Restful Blog App server started on LocalHost:3000");
});