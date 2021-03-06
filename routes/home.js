///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const WishlistController = require("../controllers/wishlist")


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

router.post("/auth/signup", async (req, res) => {
    try {
        //generate our salt
        const salt = await bcrypt.genSalt(10)
        //hash the password
        req.body.password = await bcrypt.hash(req.body.password, salt)
        //create the new user
        await User.create(req.body)
        //res.redirect to login
        res.redirect("/auth/login")
    } catch(error){
        res.json(error)
    }
})

//Login Routes
router.get("/auth/login", (req, res) => {
    res.render("auth/login")
})

router.post("/auth/login", async (req, res) => {
    try{
        //get the user
        const user = await User.findOne({username: req.body.username})
        if (user){
            //check if the passwords match
            const result = await bcrypt.compare(req.body.password, user.password)
            console.log(result)
            if (result){
                req.session.userId = user._id
                res.redirect("/wishlist/wishlist-index")
            } else {
                res.json({error: "User Doesn't Exist"})
            }
        } else {
            res.json({error: "User Doesn't Exist"})
        }
    } catch(error){
        res.json(error)
    }
})

//logout
router.get("/auth/logout", (req, res) => {
    //remove the userId property
    req.session.userId = null
    //redirect to main page
    res.redirect("/")
})


//Index route for wishlist
router.get("/wishlist/wishlist-index", isAuthorized, WishlistController.index)

// //New route to create new wishlists
router.get("/wishlist/wishlist-index/new", isAuthorized, WishlistController.new)

// //Destroy route to delete wishlists
router.delete("/wishlist/wishlist-index/:id", isAuthorized, WishlistController.destroy)

// //Update
router.put("/wishlist/wishlist-index/:id", isAuthorized, WishlistController.update)

//Create route to create new wishlist
router.post("/wishlist/wishlist-index", isAuthorized, WishlistController.create)

// //Edit route to edit wishlists
router.get("/wishlist/wishlist-index/:id/edit", isAuthorized, WishlistController.edit)

// //Show route to show a selected wishlist
router.get("/wishlist/wishlist-index/:id", isAuthorized, WishlistController.show)




///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router