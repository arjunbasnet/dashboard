var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var DashboardConfigSchema = new Schema({
    user:  ObjectId,
    widgets: [ObjectId],
    arrangement: {
        index: true,
        row: Number,
        column: Number
    }
});