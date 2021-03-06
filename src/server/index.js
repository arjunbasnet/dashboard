const express = require('express');
const app = express();
const os = require('os');
let db = require('./database')
const cors = require('cors')

app.use(cors());
const usersRouter = require('./routes/users');
const widgetsRouter = require('./routes/widgets');
const widgetConfigRouter = require('./routes/widgetconfig');
const dashboardRouter = require('./routes/dashboard');
const taskRouter = require('./routes/tasks');
const lunchRouter = require('./routes/lunch');

// connected
db.isConnected();



app.use(express.json());
app.use(express.static('dist'));

app.use('/api/users', usersRouter);
app.use('/api/widgets', widgetsRouter);
app.use('/api/widgetConfig', widgetConfigRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/tasks',taskRouter);
app.use('/api/lunch', lunchRouter);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// renders dashboard app
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'dist'});
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));