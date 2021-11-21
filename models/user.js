var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{type: String},
    password:{type: String},
    category:{type: String},
    firstname:{type:String, default:null},
    lastname:{type:String, default:null},
    email:{type:String, default:null},
    phone:{type:String, default:null},
    college:{type:String, default:null},
    city:{type:String, default:null},
    country:{type:String, default:null},
    postal:{type:String, default:null},
    aboutme:{type:String, default:null},
    solved:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question'
    }],
    submissions:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Submission'
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);