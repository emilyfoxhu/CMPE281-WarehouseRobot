const express = require("express");
const app = express.Router();
const db = require('../utils/MysqlConfig');

app.get('/usage', (req, res) => {
    console.log("Inside get all users Request");
    console.log("Req Body : ", req.body);
    db.query(
        "SELECT month(endtime) as month, YEAR(endtime) as year,\
        SUM(TIMESTAMPDIFF(HOUR, starttime, endtime)) as duration_hours\
        FROM robot\
        WHERE useremail = 'user1@gmail.com'\
        group by EXTRACT(YEAR_MONTH FROM endtime);",
        (err, result) => {
            if (err) {
                res.status(500).end("Error");
            }
            if (result) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(JSON.stringify(result));
                console.log("usage success get");
            }
        }
    );
});

module.exports = app;