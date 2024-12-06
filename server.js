const express = require('express');

const app = express();
const cors = require('cors');

const Dbconnection = require('./config/dbconnection');
Dbconnection();

const router = require('./routes/User');
app.use(express.json());

app.use(cors());

app.use(router);



app.listen(5000,()=> {
    console.log('server is running on port 5000')
})