// widget related data
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var WidgetSchema = new Schema({
	id: true,
    name:  String,
    type: String
  });