const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/', routes);


const dbConnectionString = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose.connect(dbConnectionString);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
    console.log('Error occurred while connecting with database');
});

db.once('open', () => {
    console.log("DB connected");
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running at PORT = ${process.env.SERVER_PORT}`);
    });
});

