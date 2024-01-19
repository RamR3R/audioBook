const express = require('express');
const app = express();
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api-doc.yml');


// Middleware for parsing the data for req.file
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//for api-doc using swagger-doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
