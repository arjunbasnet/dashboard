const mongoose = require("mongoose");
const schema = {
    id: {type: mongoose.Schema.Types.ObjectId, index: true},
    email: String,
    password: String,
    firstName: String,
    lastName: String
};
const collectionName = "User";
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);
//console.log(User);
module.exports = User;