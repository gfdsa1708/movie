const express = require('express');
const router = express.Router();
const data = require('../data.json');
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(data);
});

router.get('/actor', function(req, res, next) {
  connection.query(`
  SELECT 
    actor_id as actorId
    , first_name as firstName
    , last_name as lastName
    , last_update as lastUpdate 
  FROM 
    ACTOR`, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

module.exports = router;
