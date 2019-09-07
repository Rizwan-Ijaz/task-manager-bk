const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const routes = require('./routes');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/', routes);


const dbConnectionString = `mongodb://localhost:27017/task-manager`;
mongoose.connect(dbConnectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
    console.log('Error occurred while connecting with database');
});

db.once('open', () => {
    console.log("DB connected");
    app.listen(3500, () => {
        console.log(`Server is running at PORT = ${3500}`);
    });
});

