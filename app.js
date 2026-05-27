const express = require('express');
const app = express();

require('dotenv').config(); // env load

const userRouter = require('./Routes/user.routes');
const indexRouter = require('./Routes/index.routes');
const connectToDB = require('./config/db');

const cookieParser = require('cookie-parser'); // 

// DB connect
connectToDB();

// Cloudinary config (GLOBAL setup)
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// View engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);

// Server
app.listen(3000, () => {
    console.log('Server is running on port 3000 🚀');
});