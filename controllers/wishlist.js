// Import Wishlist Model
const { findByIdAndUpdate } = require("../models/User")
const User = require("../models/User")

//Controller Functions

//Index - creates page of all wishlists
const index = async (req, res) => {
    res.render("wishlist/wishlist-index", {
        // wishlist: req.user.wishlist
        user: req.user
    })
}

//New - create a new wishlist
const newWishlist = async (req, res) => {
    res.render("wishlist/new")
}

//Destroy - Destroy a wishlist
const destroy = async (req, res) => {
    const id = req.params.id
    const index = req.user.wishlist.findIndex((wishlist) => {
        return `${wishlist._id}` === id
    })
    const user = await User.findOne({ username: req.user.username })
    user.wishlist.splice(index, 1)
    user.save()
    res.redirect("/wishlist/wishlist-index")
}

//Update - update a wishlist and redirects to that list
const update = async (req, res) => {
    const id = req.params.id
    const index = req.user.wishlist.findIndex((wishlist) => {
        return `${wishlist._id}` === id
    })
    const user = await User.findOne({ username: req.user.username })
    user.wishlist[index].item = req.body.text
    user.save()
    res.redirect("/wishlist/wishlist-index")
}

//Create - Create a new wishlist
const create = async (req, res) => {
    //grab current user
    const user = await User.findOne({ username: req.user.username })
    //push new item and save
    user.wishlist.push(req.body)
    await user.save()
    //redirect to add item page
    res.redirect("/wishlist/wishlist-index")
}

//Edit - Edit a wishlsit
const edit = async (req, res) => {
    res.send("edit")
}

//Show - Shows a selected wishlist
const show = async (req, res) => {
    const id = req.params.id
    const index = req.user.wishlist.findIndex((wishlist) => {
        return `${wishlist._id}` === id
    })
    const wishlist = req.user.wishlist[index]
    res.render("wishlist/show", {wishlist})
}

module.exports = {
    index,
    new: newWishlist,
    destroy,
    update,
    create,
    edit,
    show
}