// widget related data
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
    id:{ type: mongoose.Schema.Types.ObjectId, index: true },
    name:  String,
    type: String
  });