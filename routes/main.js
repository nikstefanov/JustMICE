const mysql = require('mysql');
const path = require("path");
var con = mysql.createConnection(
    require("../config/db")
);
var express = require("express");
var router = express.Router();

con.connect();


router.get('/currencies', function(req, res) {
  con.query("SELECT * from currency", function(err,rows){
      if(err){res.json({error: err});return;}
      res.json(rows);
  })
});

module.exports = router;
