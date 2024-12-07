const express = require('express');

const app = express();
const cors = require('cors');

const Dbconnection = require('./config/dbconnection');
Dbconnection();
const cookieParser = require('cookie-parser');

const router = require('./routes/User');
app.use(express.json());

app.use(cors({
    origin: process.env.origin || 'http://localhost:3000',
    credentials:true
}));

app.use(router);
app.use(cookieParser());



app.listen(5000,()=> {
    console.log('server is running on port 5000')
})