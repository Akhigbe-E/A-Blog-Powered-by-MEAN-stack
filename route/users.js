const express = require('express');
const router = express.Router();


router.post('/user', (req, res)=>{
    res.send('Howdy mate');
});

module.exports= router;