const express = require("express");
const app = express.Router();
const db = require('../utils/MysqlConfig');

//get user information by email
app.get('/:email', (req, res) => {
    console.log("Inside user profile get Request");
    const email = req.params.email;
    console.log(email);
    
});

//update user profile info
app.post('/', (req, res) => {
    console.log("Inside user Profile Post Request");
    console.log("Req Body : ", req.body);
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    
});

module.exports = app;