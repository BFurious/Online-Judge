var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
const questionController = require("../controllers/question");
const testcaseController = require("../controllers/testcase");

router.get("/problems", middlewares.isLoggedIn, function(req, res){
    let filter = {author: req.user._id};
    questionController.getAll(filter).then((questions)=>{
        res.render("contriproblems", {questions: questions})
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/addproblem", middlewares.isLoggedIn, function(req, res){
    res.render("addproblem")
})

router.post("/addproblem", middlewares.isLoggedIn, function(req, res){
    var title = req.body.title;
    var problem_statement = req.body.desc;
    var input_format = req.body.input;
    var output_format = req.body.output;
    var difficulty = req.body.difficulty;
    var author = req.user._id;
    var question = {title, problem_statement, input_format, output_format, difficulty ,author};

    questionController.addquestion(question).then((question)=>{
        req.flash("success", "Problem added successfully !")
        res.redirect("/contributor/problems")
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.get("/problems/:id/update", middlewares.isLoggedIn, function(req, res){
    let filter = {_id: req.params.id}
    questionController.getOne(filter).then((question)=>{
        res.render("updateproblem", {question: question});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.put("/problems/:id/update", middlewares.isLoggedIn, function(req, res){
    questionController.updatequestion(req.params.id, req.body.question).then((question)=>{
        req.flash("success", "Problem updated successfully !")
        res.redirect("/contributor/problems")
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.delete("/problems/:id", middlewares.isLoggedIn, function(req, res){
    questionController.deletequestion(req.params.id).then(()=>{
        req.flash("success", "Problem deleted successfully !")
        res.redirect("/contributor/problems")
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.get("/problems/:id/testcases/view", middlewares.isLoggedIn, function(req, res){
    let filter = {_id: req.params.id}
    questionController.getOne(filter).then((question)=>{
        res.render("viewtestcase",{question: question});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.get("/problems/:id/testcases/add", middlewares.isLoggedIn, function(req, res){
    res.render("addtestcase",{question: req.params.id});
})
router.post("/problems/:id/testcases/add", middlewares.isLoggedIn, function(req, res){
    var input = req.body.input;
    var output = req.body.output;
    var testcase = {input, output};
    testcaseController.addtestcase(testcase, req.params.id).then(()=>{
        req.flash("success", "Testcase added successfully !")
        res.redirect("/contributor/problems/" + req.params.id + "/testcases/view")
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.get("/problems/:id/testcases/:test_id/update", middlewares.isLoggedIn, function(req, res){
    let filter = {_id: req.params.test_id}
    testcaseController.getOne(filter).then((testcase)=>{
        res.render("updatetestcase", {testcase: testcase, question:req.params.id});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.put("/problems/:id/testcases/:test_id/update", middlewares.isLoggedIn, function(req, res){
    testcaseController.updatetestcase(req.params.test_id, req.body.testcase).then(()=>{
        req.flash("success", "Testcase updated successfully !")
        res.redirect("/contributor/problems/" + req.params.id + "/testcases/view")
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
router.delete("/problems/:id/testcases/:test_id", middlewares.isLoggedIn, function(req, res){
    testcaseController.deletetestcase(req.params.test_id).then(()=>{
        req.flash("success", "Testcase deleted successfully !")
        res.redirect("/contributor/problems/" + req.params.id + "/testcases/view")
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})
module.exports = router;