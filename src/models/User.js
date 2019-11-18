 var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
	id: Number,
    email:  String,
    password: String
  });