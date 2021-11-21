var express                 = require("express"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    flash                   = require("connect-flash"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    homeroutes              = require("./routes/home.routes"),
    authroutes              = require("./routes/auth.routes"),
    problemroutes           = require("./routes/problems.routes"),
    contriroutes            = require("./routes/contri.routes")    

var app = express();
// mongoose.connect("mongodb://localhost:27017/onlineJudge",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false});
mongoose.connect("mongodb+srv://Arnav:Arnav2000@cluster0-0eldl.mongodb.net/OnlineJudge?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false});

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"No secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(homeroutes);
app.use(authroutes);
app.use("/problems", problemroutes);
app.use("/contributor", contriroutes);
let port = process.env.PORT||4000;
app.listen(port);