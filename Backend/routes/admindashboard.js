const express = require("express");
const app = express.Router();
const db = require('../utils/MysqlConfig');

app.get('/users', (req, res) => {
    console.log("Inside get all users Request");
    console.log("Req Body : ", req.body);
    db.query(
        "SELECT * FROM user;",
        (err, result) => {
            if (err) {
                res.status(500).end("Error");
            }
            if (result) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(JSON.stringify(result));
                console.log("all users success get");
            }
        }
    );
});

module.exports = app;