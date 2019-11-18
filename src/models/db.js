import * as DashboardConfigModel from "./DashboardConfig.js"
import * as WidgetModel from "./Widget.js"
import * as WidgetConfigModel from "./WidgetConfig"
import * as UserModel from "./User"
const mongoose = require('mongoose');

class Database {
    constructor(){

        mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log("Database connection is working!")
        });
    }
}
export default Database;
