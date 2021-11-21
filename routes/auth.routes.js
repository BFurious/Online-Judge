var express = require("express");
var router = express.Router();
var passport = require("passport");
const middlewares = require("../middlewares/auth");
var User = require("../models/user");

router.get("/register_U",middlewares.isLogged,function(req, res){
    res.render('register');
})

router.get("/register_C",middlewares.isLogged,function(req, res){
    res.render('register1');
})

router.get("/login",middlewares.isLogged,function(req, res){
    res.render('login');
})

router.post("/register_U", function(req, res){
    var category = "User";
    User.register(new User({username:req.body.username, category:category}),req.body.password, function(err, user){
        if(err){
            console.log(err.toString());
            req.flash("error", err.toString())
            return res.redirect("/register_U")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Registered successfully !");
            res.redirect("/profile");
        }); 
    });
});

router.post("/register_C", function(req, res){
    var category = "Contributor";
    User.register(new User({username:req.body.username, category:category}),req.body.password, function(err, user){
        if(err){
            console.log(err.toString()); 
            req.flash("error", err.toString());
            return res.redirect("/register_C")
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Registered successfully !");
            res.redirect("/profile");
        }); 
    });
});

router.post("/login", passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login",
    successFlash:"Logged in successfully !",
    failureFlash:"Invaild username or password"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out")
    res.redirect("/login");
});

module.exports = router;
