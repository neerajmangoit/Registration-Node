const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const app = express();
const router = require('./routes/routes');
const sequelize = require('sequelize');
app.use(bodyParser.json());


// routes
app.use('/', router);

db.authenticate().then(() => {
    console.log("Database connected.....");
}).catch(err => {
    console.log("Error connecting" + err);
});


const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`application running on port ${PORT}`)); //