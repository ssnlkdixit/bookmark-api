var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser")
   

mongoose.connect("mongodb://localhost:27017/bookmark",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("database conected")
})
mongoose.connect("mongodb://localhost:27017/tag",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("database conected")
})
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
var bookmarkSchema = new mongoose.Schema({
        title: String,
        link: String,
        publisher: String,
        created: {type: Date, default: Date.now}
    
     })
var bookmark = mongoose.model("bookmark",bookmarkSchema)
var tagSchema = new mongoose.Schema({
        name: String,
        created: {type: Date, default: Date.now}
    
     })
var tag = mongoose.model("tag",tagSchema)
 tag.create({

        name: "movies",
        

    }) 
        
    
app.set("view engine", "ejs")
         
app.get("/bookmark",function(req,res){
    bookmark.find({},function(err,bookmarks){
        if(err){
            console.log("error")
        }else{
            res.render("index",{bookmarks:bookmarks})
        }
    })

    app.get("/bookmark/:id", function(req,res){
        bookmark.findById(req.params.id, function(err, foundbookamrk){
            
            if(err){
                res.redirect("/bookmark")
            }else{
                res.render("show", {bookmark: foundBookmark})
            }
        })
     })
    // tag.find({},function(err,tags){
    //     if(err){
    //         console.log("error")
    //     }else{
    //         res.render("index",{tags:tags})
    //     }
    // })
})
app.get("/bookmark/new",function(req, res){
    console.log(req.body)
    res.render("new")
})

app.post("/bookmark",function(req,res){
    
    
    bookmark.create(req.body.bookmark, function(err, newtag){
        if(err){
            console.log(err)
        }else{
            res.redirect("/bookmark")
        }
    })
})
app.delete("/bookamrk",function(req,res){
    res.send("you have destroyed it")
})

app.listen(3000, ()=> console.log("blog servaer has strted"))

