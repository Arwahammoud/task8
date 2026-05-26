require('dotenv').config();
const express = require('express');
const morgan = require ('morgan');
const mongoose = require("mongoose");
const app = express();

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

//middleware
app.use(express.json());
app.use(morgan('dev'));

//apis - routes .. 
app.use('/api/v1/health',(req,res)=>res.status(200).json("Server is healthy"));

app.use('/api/v1/users', require('./routes/users.routes'));
app.use('/api/v1/materials', require('./routes/materials.routes'));
app.use('/api/v1/reviews', require('./routes/reviews.routes'));
app.use('/api/v1/reservations', require('./routes/reservations.routes'));
app.use('/api/v1/loans', require('./routes/loans.routes'));
 
 
app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;


mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to MONGODB Successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    })
    .catch(err => {
        console.log('Error MONGODB', err.message);
    })