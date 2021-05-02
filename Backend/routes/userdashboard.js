const express = require("express");
const app = express.Router();
const db = require('../utils/MysqlConfig');

app.get('/usage/:email', (req, res) => {
    console.log("Inside get all users Request");
    console.log("Req Body : ", req.body);
    const email = req.params.email;
    db.query(
        "SELECT month(endtime) as month, YEAR(endtime) as year,\
        SUM(TIMESTAMPDIFF(HOUR, starttime, endtime)) as duration_hours\
        FROM simulation\
        WHERE user_email = ?\
        group by EXTRACT(YEAR_MONTH FROM endtime);", email,
        (err, result) => {
            if (err) {
                console.log(err);
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