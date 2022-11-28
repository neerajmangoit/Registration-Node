const express = require('express');
const bodyParser = require('body-parser');
const db = require('./Config/database');
const app = express();
const router = require('./Routes/routes');
const sequelize = require('sequelize');
app.use(bodyParser.json());

const sendMail = require('@sendgrid/mail');
const API_KEY = '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';
sendMail.setApiKey(API_KEY);



// routes

app.use('/', router);

db.authenticate().then(() => {
    console.log("Database connected.....");
}).catch(err => {
    console.log("Error connecting" + err);
});


const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`application running on port ${PORT}`)); //