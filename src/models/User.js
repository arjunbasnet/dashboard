 var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
	id: true,
    email:  String,
    password: String,
    firstName: String,
    lastName: String
  });