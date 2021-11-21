const mongoose = require('mongoose');

const TestcaseSchema = new mongoose.Schema({
  input: {
    type: String,
    default: ''
  },

  output: {
    type: String,
    default: ''
  }
}); 

module.exports = mongoose.model('Testcase', TestcaseSchema);