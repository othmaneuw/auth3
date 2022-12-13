const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

//Connect to DB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECT)
 .then(res => console.log("Connected to DB"))
 .catch(err =>console.log(err));

// app.use(express.json());
app.use(bodyParser.json());
app.use('/api/user',authRoutes);
app.use('/api/posts',postsRoutes);

app.listen(3000,()=>console.log("Server up and running"));