var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
const questionController = require("../controllers/question");
const userController = require("../controllers/user");

router.get("/", function(req, res){
    res.redirect("/home")
})

router.get("/home", function(req, res){
    res.render("home")
})

router.get("/profile", middlewares.isLoggedIn, function(req, res){
    if(req.user.category == "User")
        res.render("userprofile",{user:req.user});
    else if(req.user.category == "Contributor")
        res.render("contriprofile",{user:req.user})
})

router.put("/profile", middlewares.isLoggedIn, function(req, res){
    userController.updateuser(req.body.user, req.user._id).then(()=>{
        req.flash("success", "User updated successfully !");
        res.redirect("/profile");
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })
})

router.get("/submissions", middlewares.isLoggedIn, function(req, res){
    let filter = {_id: req.user._id};
    let qfilter = {};
    userController.getOne(filter).then((user)=>{
        questionController.getAll(qfilter).then((questions)=>{
            res.render("submissions", {submissions:user.submissions, questions:questions});
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })
})
router.get("/submissions/:id", middlewares.isLoggedIn, function(req, res){
    let filter = {_id: req.params.id};
    userController.getSubmission(filter).then((submission)=>{
        res.render("submission", {submission:submission});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })
})

router.get("/solved", middlewares.isLoggedIn, function(req, res){
    let filter = {_id: req.user._id};
    userController.getOne(filter).then((user)=>{
        res.render("solved", {questions:user.solved});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })
})

module.exports = router;