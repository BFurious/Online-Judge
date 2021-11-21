const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question'
  },

  code: {
    type: String,
    required: true
  },
  
  verdict: {
    type: String,
    required: true,
    default: 'running'
  }

});

module.exports = mongoose.model("Submission", SubmissionSchema);