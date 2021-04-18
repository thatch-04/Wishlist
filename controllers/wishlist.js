// Import Wishlist Model
const { findByIdAndUpdate } = require("../models/User")
const Wishlist = require("../models/User")

//Controller Functions

//Index - creates page of all wishlists
const index = async (req, res) => {
    const Wishlists = await Wishlist.find({})
    res.render("wishlist/wishlist-index", {
        wishlists: Wishlists
    })
}

//New - create a new wishlist
const newWishlist = async (req, res) => {
    res.send("new")
}

//Destroy - Destroy a wishlist
const destroy = async (req, res) => {
    res.send("destroy")
}

//Update - update a wishlist and redirects to that list
const update = async (req, res) => {
    res.send("update")
}

//Create - Create a new wishlist
const create = async (req, res) => {
    res.send("create")
}

//Edit - Edit a wishlsit
const edit = async (req, res) => {
    res.send("edit")
}

//Show - Shows a selected wishlist
const show = async (req, res) => {
    res.send("show")
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