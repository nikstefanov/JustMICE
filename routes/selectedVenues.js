const mysql = require('mysql');
const path = require("path");
var express = require("express");
var router = express.Router();
var con = mysql.createConnection(
    require("../config/db")
);

con.connect();

router.get('/:id', function(req, res) {
  const id = parseInt(req.params.id);
  var result={};
  if(req.params.id=='count'){
    if(typeof req.session.selectedVenues == 'undefined'){
      result.success = 0;
    }else{
      result.success = req.session.selectedVenues.length;
    }
  } else if (isNaN(id)){
      result.error = "Wrong id";
  } else {
    if(typeof req.session.selectedVenues == 'undefined'){
      req.session.selectedVenues = [];
    }
    if(req.session.selectedVenues.indexOf(id) !== -1){
      result.error = "Already in the list.";
    } else if(req.session.selectedVenues.length == 5) {
      result.error = "List already full.";
    } else {
      req.session.selectedVenues.push(id);
      result.success = "Success";
    }
    //console.log(req.session.selectedVenues);
  }
  res.json(result);
});

router.get('/remove/:id', function(req, res) {
  const id = parseInt(req.params.id);
  var result={};
  if(typeof req.session.selectedVenues == 'undefined'){
      req.session.selectedVenues = [];
  }
  if (req.params.id=='all'){
    req.session.selectedVenues = [];
    result.success = "Success";
  }else if (isNaN(id)){
      result.error = "Wrong id";
  }else{
    var ind = req.session.selectedVenues.indexOf(id);
    if( ind == -1){
      result.error = "Not in the list.";
    } else if(req.session.selectedVenues.length == 0) {
      result.error = "List already empty.";
    } else {
      //req.session.selectedVenues.push(id);
      req.session.selectedVenues.splice(ind, 1);
      result.success = "Success";
    }
    //console.log(req.session.selectedVenues);
  }
  res.json(result);
});

const sql_search_all = 	'SELECT p.id, p.name, '+
			  'p.thumbnail, '+
			  'p.rating, '+
			  'p.description, '+
			  'p.meeting_space, '+
        'p.preferred, '+
			  'c.name as chain, '+
			  'b.name as brand '+
			'FROM property as p '+
			  'LEFT JOIN address as a '+
			  'ON a.id=p.address_id '+
			  'LEFT JOIN hotel_brand as b '+
			  'ON b.id=p.hotel_brand_id '+
			  'LEFT JOIN hotel_chain as c '+
			  'ON c.id=b.hotel_chain_id '+
			  //'LEFT JOIN meeting_room as m '+
			  //'ON p.id=m.property_id '+
			  //'LEFT JOIN room_setup as r '+
			  //'ON m.id=r.meeting_room_id '+
			'WHERE p.id IN (?,?,?,?,?) ';

router.post('/all', function(req, res) {
	var values = [];//[1,2,3,4,5];//testing
	if(typeof req.session.selectedVenues == 'undefined'){
	  req.session.selectedVenues = [];
	}
	for(var i=0,len=req.session.selectedVenues.length; i<len; i++){
	  values.push(req.session.selectedVenues[i]+'');
	}
	//req.session.selectedVenues.map((item)=>values.push(item+''));
	for(var i=0,len=5-req.session.selectedVenues.length; i<len; i++){
	  values.push('0');
	}

	con.query(sql_search_all, values,function (err, result) {
		if (err) {
			res.send({'error':'An error has occurred'});
			console.log(err);
		} else {
			res.send(result);
		}
	});
});
/*
const sql_search_rfp = 'SELECT p.id, p.name, '+
			  'p.thumbnail, '+
			  'p.rating, '+
			  'p.description, '+
			  'p.meeting_space, '+
			  'c.name as chain, '+
			  'b.name as brand '+
			'FROM property as p '+
			  'RIGHT JOIN rfp_property as rp '+
			  'ON rp.property_id=p.id '+
			  'LEFT JOIN hotel_brand as b '+
			  'ON b.id=p.hotel_brand_id '+
			  'LEFT JOIN hotel_chain as c '+
			  'ON c.id=b.hotel_chain_id '+
			  //'LEFT JOIN meeting_room as m '+
			  //'ON p.id=m.property_id '+
			  //'LEFT JOIN room_setup as r '+
			  //'ON m.id=r.meeting_room_id '+
			  'WHERE rp.rfp_id = ? ';
*/
const sql_search_rfp = 'SELECT rp.property_id as id '+
			                 'FROM rfp_property as rp '+
			                 'WHERE rp.rfp_id = ? ';
router.get('/rfp/:rfp_id', function(req, res) {
  const rfp_id = parseInt(req.params.rfp_id,10);
	req.session.selectedVenues = [];

	con.query(sql_search_rfp, [rfp_id],function (err, result) {
		if (err) {
			res.send({'error':'An error has occurred'});
			console.log(err);
		} else {
      //console.log(result);
      var ids_array = result.map((hotelInfo) => hotelInfo.id);
      req.session.selectedVenues = ids_array;
			res.send({'success': 'success'});
		}
	});
});

module.exports = router;
