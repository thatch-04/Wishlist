///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

///////////////////////////////
// Custom Middleware Functions
////////////////////////////////

//check if user logged in, add req.user
const addUserToRequest = async (req, res, next) => {
    //check if the user is logged in
    if (req.session.userId){
        req.user = await User.findById(req.session.userId)
        next()
    } else {
        next()
    }
}

//checks if req.user exists, if not redirect to login
const isAuthorized = (req, res, next) => {
    if(req.user){
        next()
    } else {
        res.redirect("/auth/login")
    }

}

///////////////////////////////
// Router Specific Middleware
////////////////////////////////

router.use(addUserToRequest)

///////////////////////////////
// Router Routes
////////////////////////////////

//Home route to signup/login page
router.get("/", (req, res) => {
    res.render("home")
})

//AUTH Routes

//Sign up routes
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
})







///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router