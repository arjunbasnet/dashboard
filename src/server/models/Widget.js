// widget related data
const mongoose = require("mongoose");
const schema = {
    id:{ type: mongoose.Schema.Types.ObjectId, index: true },
    name:  String,
    type: String
};
const collectionName = "Widget";
const widgetSchema = mongoose.Schema(schema);
const Widget = mongoose.model(collectionName, widgetSchema);
module.exports = Widget;
