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

router.get('/film', function(req, res, next) {
  const limit = 12;
  const offset = (req.query.pageNo-1) * limit;
  connection.query(`
  select f.*, c.name as category from film f inner join film_category fc on f.film_id = fc.film_id inner join category c on fc.category_id =c.category_id order by f.film_id limit ${limit} offset ${offset}
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});
module.exports = router;
