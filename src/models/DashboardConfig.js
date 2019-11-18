var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DashboardConfigSchema = new Schema({
    user:  Number,
    widgets: [Number],
    arrangement: {
        id:{ type: mongoose.Schema.Types.ObjectId, index: true },
        row: Number,
        column: Number
    }
});