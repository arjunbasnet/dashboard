// widget related data
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var WidgetSchemaSchema = new Schema({
	WidgetID: Number,
    data: Object
  });