const mongoose = require("mongoose");
const schema = {
    user:  mongoose.Schema.Types.ObjectId,
    arrangement: [{
        id:{ type: mongoose.Schema.Types.ObjectId, index: true },
        widgetId: mongoose.Schema.Types.ObjectId,
        row: Number,
        column: Number
    }]
};
const collectionName = "DashboardConfig";
const dashboardSchema = mongoose.Schema(schema);
const DashboardConfig = mongoose.model(collectionName, dashboardSchema);
module.exports = DashboardConfig;