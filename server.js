const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api', router);

app.get('/',(req,res)=>{
    res.send("Backend running")
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})