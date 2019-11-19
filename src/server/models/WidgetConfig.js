const mongoose = require("mongoose");
const schema = {
  WidgetID: mongoose.Schema.Types.ObjectId,
  data: Object
};
const collectionName = "WidgetConfig";
const wconfigSchema = mongoose.Schema(schema);
const WidgetConfig = mongoose.model(collectionName, wconfigSchema);
module.exports = WidgetConfig;