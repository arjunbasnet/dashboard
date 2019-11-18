 const mongoose = require("../db");
 const schema = {
     id:{ type: mongoose.Schema.Types.ObjectId, index: true },
     email:  String,
     password: String,
     firstName: String,
     lastName: String
 };
 const collectionName = "User";
 const userSchema = mongoose.Schema(schema);
 const User = mongoose.model(collectionName, userSchema);
 console.log(User);
 User.create({
     email:  "yo2mno@yahoo.ro",
     password: "123456",
     firstName: "Mihai",
     lastName: "Macarie"
 });
 module.exports = User;