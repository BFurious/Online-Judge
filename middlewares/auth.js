var middlewares = {};

middlewares.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please! Login First.")
    return res.redirect("/login");
}

middlewares.isLogged = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/home")
    }
    return next();
}

module.exports = middlewares;