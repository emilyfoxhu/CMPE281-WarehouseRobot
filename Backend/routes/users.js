var express = require('express');
var router = express.Router();
const db = require('../utils/MysqlConfig');

/* GET users listing. */
router.post('/startSimulation', function(req, res, next) {
  const email = req.body.email;
  const robotName = req.body.robotName;
  const simulationName = req.body.simulationName;
  db.query(
      "INSERT into simulation (simulationName, starttime, endtime, user_email, robotName) VALUES (?,?,?,?,?);", [simulationName, new Date(), null, email, robotName], (err, result) => {
        if (err) {
          res.status(500).end("Error");
          console.log(err);
        } else {
          res.status(200).end("records_added");
        }
      }
  );
});

/* GET users listing. */
router.post('/stopSimulation', function(req, res, next) {
    const simulationName = req.body.simulationName;
    db.query(
        "UPDATE simulation SET endtime=? WHERE simulationName=?;", [new Date(), simulationName], (err, result) => {
            if (err) {
                res.status(500).end("Error");
                console.log(err);
            } else {
                res.status(200).end("records_added");
            }
        }
    );
});

/* GET users listing. */
router.post('/addPricingDetails', function(req, res, next) {
  const email = req.body.email;
  const robotName = req.body.robotName;
  const simulationName = req.body.simulationName;
  let hours = 0;

  db.query(
        "SELECT * from simulation WHERE simulationName=?;", [simulationName], (err, result) => {
            if (err) {
                res.status(500).end("Error");
                console.log(err);
            } else {
                let startDate = null;
                let endDate = null;
                let diff = null;
                for (let i=0; i < result.length; i++) {
                    startDate = new Date(result[i].starttime.toString());
                    endDate = new Date(result[i].endtime.toString());
                    diff =(endDate.getTime() - startDate.getTime()) / 1000;
                    diff = diff/(60 * 60);
                    hours = hours +  Math.abs(Math.round(diff));
                    if ( hours === 0 ) {
                        hours = 1;
                    }
                }
                console.log("records_added");
                db.query(
                    "INSERT into billing (robot_name, price, simulation_name, user_email, creationdate) VALUES (?,?,?,?,?);", [robotName, (hours * 5), simulationName, email, new Date()], (err, result) => {
                        if (err) {
                            res.status(500).end("Error");
                            console.log(err);
                        } else {
                            res.status(200).end("records_added");
                        }
                    }
                );
            }
  });
});

module.exports = router;
