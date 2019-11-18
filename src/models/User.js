 var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id:{ type: mongoose.Schema.Types.ObjectId, index: true },
    email:  String,
    password: String,
    firstName: String,
    lastName: String
  });