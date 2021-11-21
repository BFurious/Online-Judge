var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    problem_statement: {
        type: String,
        required: true
    },
    input_format: String,
    output_format: String,
    difficulty: String,
    author: {
        type: String,
        required: true
    },
    testcases:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Testcase'
    }]
});

module.exports = mongoose.model("Question",QuestionSchema);