const mysql = require('mysql');
const path = require("path");
var Promise = require('promise');

var con = mysql.createConnection(
    require("../config/db")
);
var express = require("express");
var router = express.Router();

con.connect(); 

const sql_insert_event = 'INSERT INTO event (' +
                            'company_id,' +
                            'name,' +
                            'description,' +
                            'startdate,' +
                            'enddate,' +
                            'city,' +
                            'num_participants,' +
                            'num_eventrooms,' +
                            'num_single_rooms,' +
                            'num_double_rooms,' +
                            'num_superior_rooms,' +
                            'features' +
                            ') VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';


const sql_insert_rfp = 'INSERT INTO rfp (' +
                          'event_id,' +
                          'currency_id,' +
                          'name,' +
                          'status,' +
                          'terms' +
                          ') SELECT ?,c.id,?,?,? ' +
                          '  FROM currency as c ' +
                          '  WHERE c.currency_code = ? '
                          ;

const sql_insert_rfp_property = 'INSERT INTO rfp_property (' +
                                  'rfp_id,' +
                                  'property_id' +
                                  ') VALUES (?,?)';

const sql_last_id_event = 'SELECT MAX(id) as max_id  FROM event';
const sql_last_id_rfp = 'SELECT MAX(id) as max_id FROM rfp';


router.post('/insert', function(req, res) {
  //console.log("Selected:");
  //console.log(req.body.selected);
  var cur_code = 'EUR';
  var values_event = [
    1,
    req.body.name,
    req.body.type,
    req.body.start_date.replace("T", " ").replace("Z", ""),
    req.body.end_date.replace("T", " ").replace("Z", ""),
    req.body.location,
    req.body.attendees,
    req.body.event_rooms,
    req.body.single_rooms,
    req.body.double_rooms,
    req.body.superior_rooms,
    JSON.stringify(req.body.features),
    //null
  ];

  con.query(sql_insert_event, values_event,function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred in DB operations. Url /api/event_details/insert'});
      console.log(err);
      //throw err;
    } else {
      last_id_event(req, res,cur_code);
    }
  });
});

function last_id_event(req, res,cur_code){
  con.query(sql_last_id_event,function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred in DB operations. Url /api/event_details/insert'});
      console.log(err);
      //throw err;
    } else {
      var ev_id = result[0].max_id;
      console.log("ev_id:" + ev_id);
      insert_rfp(req, res, ev_id, cur_code);
    }
  });
}


  function insert_rfp(req, res, ev_id, cur_code){
    var values = [
      ev_id,
      '',
      'unsent',
      null,
      cur_code,
    ];
      con.query(sql_insert_rfp, values, function (err, result) {
        if (err) {
          res.send({'error':'An error has occurred in DB operations. Url /api/event_details/insert'});
          console.log(err);
          //throw err;
        } else {
          last_id_rfp(req, res, ev_id);
        }
      });
  }



function last_id_rfp(req, res, ev_id){
  con.query(sql_last_id_rfp,function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred in DB operations. Url /api/event_details/insert'});
      console.log(err);
      //throw err;
    } else {
      insert_rfp_property(req, res, result[0].max_id, ev_id);
    }
  });
}

function insert_rfp_property(req, res, rfp_id, ev_id){
  if (req.body.selected.length == 0){
    res.send({'event_id':ev_id, 'rfp_id':rfp_id});
  } else {
    var sql_insert_rfp_property = "INSERT INTO rfp_property (rfp_id, property_id) VALUES ";
    req.body.selected.map(
      function(id){
        sql_insert_rfp_property += '(' + rfp_id + ',' +
                                    con.escape(id) +
                                    '),';
    });
    //console.log("Query:" + sql_insert_rfp_property);
    sql_insert_rfp_property = sql_insert_rfp_property.substring(0, sql_insert_rfp_property.length-1);
    con.query(sql_insert_rfp_property, function (err, result) {
      if (err) {
        res.send({'error':'An error has occurred in DB operations. Url /api/event_details/insert'});
        console.log(err);
        //throw err;
      } else {
        res.send({'event_id':ev_id, 'rfp_id':rfp_id});
      }
    });
  }
}

  //con.end();
	module.exports = router;
