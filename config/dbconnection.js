const mongoose = require('mongoose');
require('dotenv').config();
const Dbconnection = () => {
    mongoose.connect(process.env.MONGODB_URI,{
        
    }).then(()=> {
        console.log('connected to the database');
    }).catch((error)=> {
      console.log(error);  
    })
}

module.exports = Dbconnection;