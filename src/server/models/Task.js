const mongoose = require('mongoose')

const schema = {
    description: String,
    user: mongoose.Schema.Types.ObjectId,
    completed: Boolean,
  };

const collectionName = "task";
const taskSchema = mongoose.Schema(schema);
taskSchema.set('timestamps',true);
const taskModel = mongoose.model(collectionName, taskSchema);

module.exports = taskModel;