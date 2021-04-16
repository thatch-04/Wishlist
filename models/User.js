//import model and schema
const {Schema, model} = require("../db/connection")

//The Wishlist Schema
const Wishlist = new Schema ({
    list: [String]
})

//The User Schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    wishlist: [Wishlist]
})

//Create the user model
const User = model("User", UserSchema)

//export the User model
module.exports = User