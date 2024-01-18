const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data
app.use(multer().any()); // Middleware for handling file uploads

const userRoutes = require('./routers/userRouter');
const abRouter = require('./routers/audiobookRouter');
const courseRoutes = require('./routers/coursesRouter');
const connect = require('./config/db');


require("dotenv").config();

app.use('/users', userRoutes);
app.use('/audiobooks', abRouter);
app.use('/courses', courseRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome to Audio Book player Backend" , status : 'working'})
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connect;
    console.log(`Server is running on port ${PORT}`);
});
