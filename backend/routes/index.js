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

router.get('/films/page', function(req, res, next) {
  const limit = 12;
  const offset = (req.query.pageNo-1) * limit;
  connection.query(`
  select f.*, c.name as category from film f inner join film_category fc on f.film_id = fc.film_id inner join category c on fc.category_id =c.category_id order by f.film_id limit ${limit} offset ${offset}
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.get('/film', function(req, res, next) {
  const filmId = req.query.filmId
  connection.query(`
  select f.*, c.name as category 
  from film f 
  inner join film_category fc 
  on f.film_id = fc.film_id 
  inner join category c 
  on fc.category_id =c.category_id 
  where f.film_id = ${filmId}
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.get('/actor/film', function(req, res, next) {
  const filmId = req.query.filmId
  connection.query(`
  select concat(a.first_name,' ',a.last_name) as fullName
  ,a.actor_id  
  from film f 
  inner join film_actor fa
  on f.film_id = fa.film_id 
  inner join actor a
  on fa.actor_id = a.actor_id 
  where f.film_id = ${filmId}
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.get('/reply', function(req, res, next) {
  const filmId = req.query.filmId
  connection.query(`
  select concat(c.first_name ,' ',c.last_name) as username ,r.comment, r.reply_id 
  from reply r 
  inner join customer c
  on c.customer_id = r.customer_id 
  where r.film_id = ${filmId}
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.post('/reply/write', function(req, res, next) {
  const params = req.body.params;
  const {filmId, customerId, comment} = params;
  connection.query(`
  insert into reply
  ( 
    film_id
    ,customer_id
    ,comment
  )
  values
  (
    ${filmId}
    ,${customerId}
    ,'${comment}'
  )
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.post('/reply/delete', function(req, res, next) {
  const params = req.body.params;
  const {filmId} = params;
  connection.query(`
  delete from reply
  where reply_id=${filmId}
    `, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});
module.exports = router;
