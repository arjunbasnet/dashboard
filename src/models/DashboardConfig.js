const mongoose = require("../db");
const schema = {
    user:  mongoose.Schema.Types.ObjectId,
    widgets: [mongoose.Schema.Types.ObjectId],
    arrangement: {
        id:{ type: mongoose.Schema.Types.ObjectId, index: true },
        row: Number,
        column: Number
    }
};
const collectionName = "DashboardConfig";
const dashboardSchema = mongoose.Schema(schema);
const DashboardConfig = mongoose.model(collectionName, dashboardSchema);
module.exports = DashboardConfig;