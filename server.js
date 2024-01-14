const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(express.json());

app.use(express.json());

//env variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_DB_URL;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

if (mongoose.connect(`${DB_URL}`)) {
    console.log("Connected to DB")
} else {
    console.log(Error)
}


//text file routes
const textRoutes = require('./routes/textRoutes');
app.use('/files', textRoutes);


app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
})