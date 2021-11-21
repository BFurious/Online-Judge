const Question = require("../models/question");

exports.getAll = function(filter){
    return Question.find(filter).exec();
}
exports.getOne = function(filter){
    return Question.findOne(filter).populate("testcases").exec();
}
exports.addquestion = async function(question){
    const newQuestion = new Question(question);
    return await newQuestion.save(); 
}
exports.updatequestion = function(question_id, question){
    return Question.findByIdAndUpdate(question_id, question);
}
exports.deletequestion = function(question_id){
    return Question.findByIdAndRemove(question_id);
}