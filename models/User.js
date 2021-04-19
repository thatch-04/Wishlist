//import model and schema
const {Schema, model} = require("../db/connection")

//The Items Schema
const Wishlists = new Schema ({
    item: String,
})

//The User Schema
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    wishlist: [Wishlists]
})

//Create the user model
const User = model("User", UserSchema)

//export the User model
module.exports = User