var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
const questionController = require("../controllers/question");
const userController = require("../controllers/user");
const run = require("../code_compiler/compile_code").run;

router.get("/", function(req, res){
    let filter = {};
    let user = req.user;
    questionController.getAll(filter).then((questions)=>{
        if(req.user != null)
            res.render("problems", {questions: questions, solved:user.solved});
        else
            res.render("problems", {questions: questions});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })
})

router.get("/:id", function(req, res){
    let filter = {_id: req.params.id}
    questionController.getOne(filter).then((question)=>{
        res.render("problem", {question: question});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })  
})

router.post("/:id/submit", middlewares.isLoggedIn, function(req, res){
    var code = req.body.code;
    let filter = {_id: req.params.id};
    questionController.getOne(filter).then((question)=>{
        run(question.testcases, code, req.user.username).then((verdict)=>{
            var question_id = question._id;
            var submission = {question_id, code, verdict};
            userController.addSubmission(submission, req.user).then((user)=>{
                if(verdict[0] == 'W')
                    req.flash("error", verdict);
                else
                    req.flash("success", verdict);
                res.redirect("/problems/"+ req.params.id);
            }).catch((err)=>{
                console.log(err)
                res.redirect("back");
            })
        }).catch((err)=>{
            console.log(err);
            req.flash("error", "Compilation error !");
            res.redirect("back");
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back");
    })
})
module.exports = router;