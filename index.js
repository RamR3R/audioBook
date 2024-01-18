const express = require('express');
const app = express();

// Middleware for parsing the data for req.file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
