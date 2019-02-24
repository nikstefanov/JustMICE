const mysql = require('mysql');
const path = require("path");
var Promise = require('promise');

var con = mysql.createConnection(
    require("../config/db")
);
var express = require("express");
var router = express.Router();

con.connect();

const sql_update_event = 'UPDATE event SET ' +
                            'company_id = ?,' +
                            'name = ?,' +
                            'description = ?,' +
                            'startdate = ?,' +
                            'enddate = ?,' +
                            'city = ?,' +
                            'num_participants = ?,' +
                            'num_eventrooms = ?,' +
                            'num_single_rooms = ?,' +
                            'num_double_rooms = ?,' +
                            'num_superior_rooms = ?,' +
                            'features = ? ' +
                            'WHERE id = ?';

const sql_insert_rfp_property = 'INSERT INTO rfp_property (' +
                                  'rfp_id,' +
                                  'property_id' +
                                  ') VALUES (?,?)';

const sql_delete_from_rfp_property = 'DELETE FROM rfp_property '+
                                      'WHERE rfp_id = ?';


router.post('/', function(req, res) {
  //console.log("Selected:");
  //console.log(req.body.selected);
  //var cur_code = 'EUR';
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
    req.body.event_id,
  ];

  con.query(sql_update_event, values_event, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred in DB operations. Url /api/event_details/update'});
      console.log(err);
      //throw err;
    } else {
      delete_from_rfp_property(req, res);
    }
  });
});

function delete_from_rfp_property(req, res){
  con.query(sql_delete_from_rfp_property, [req.body.rfp_id] ,function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred in DB operations. Url /api/event_details/update'});
      console.log(err);
      //throw err;
    } else {
      insert_rfp_property(req, res);
    }
  });
}

function insert_rfp_property(req, res){
  var rfp_id = req.body.rfp_id;
  var ev_id = req.body.event_id;
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
        res.send({'error':'An error has occurred in DB operations. Url /api/event_details/update'});
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
