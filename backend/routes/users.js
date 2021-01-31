const express = require('express');
const router = express.Router();
const mysql      = require('mysql');
const dbconfig   = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const {username, password} = req.body.params;
  connection.query(`
  select username, password from staff where username = '${username}' and password ='${password}'`, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});
module.exports = router;
