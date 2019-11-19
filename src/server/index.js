const express = require('express');
const app = express();
const os = require('os');
const usersRouter = require('./routes/users')
const mongoose = require("mongoose");
const dbPath = "mongodb://localhost/test"
var path = require('path');




mongoose.connect(dbPath, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});
app.use(express.json());
app.use(express.static('dist'));
app.use('/users', usersRouter);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

//app.use('/static', express.static(path.join(__dirname, '../../build/static')));
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'dist'});
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));