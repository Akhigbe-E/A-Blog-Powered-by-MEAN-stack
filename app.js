const express = require('express');
const router = express.Router();
const authenticate = require('./route/authentication')(router)
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log('Could not connect to database')
    }else{
        console.log('Connection to database succesful')
    }
})
//to use express
const app = express();


//MiddleWare
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//static files
app.use(express.static(__dirname + './clientSide/src'));
app.use('/authenticate', authenticate);




app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/clientSide/src/index.html'))
})
//listen to a port
app.listen(8080);
console.log('You are listening to port 3000...');
