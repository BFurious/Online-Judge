const Question = require("../models/question");
const Testcase = require("../models/testcase");

exports.getOne = function(filter){
    return Testcase.findOne(filter).exec();
}
exports.addtestcase = async function(testcase, question_id){
    const newTestcase = new Testcase(testcase);
    newTestcase.save();
    const question = await Question.findById(question_id);
    question.testcases.push(newTestcase._id);
    return await question.save();
}
exports.updatetestcase = function(testcase_id, testcase){
    return Testcase.findByIdAndUpdate(testcase_id, testcase);
}
exports.deletetestcase = function(testcase_id){
    return Testcase.findByIdAndRemove(testcase_id);
}