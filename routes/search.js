const mysql = require('mysql');
const path = require("path");
var con = mysql.createConnection(
    require("../config/db")
);
var express = require("express");
var router = express.Router();

con.connect();

const sql_id = 'SELECT name FROM property WHERE id = ?';
const sql_all = 'SELECT name FROM property';
const sql_search = 'SELECT p.name '+
	'FROM property as p '+
	'LEFT JOIN address as a '+
	'ON a.id=p.address_id '+
	'LEFT JOIN hotel_brand as b '+
	'ON b.id=p.hotel_brand_id '+
	'LEFT JOIN hotel_chain as c '+
	'ON c.id=b.hotel_chain_id '+
	'LEFT JOIN meeting_room as m '+
	'ON p.id=m.property_id '+
	'LEFT JOIN room_setup as r '+
	'ON m.id=r.meeting_room_id '+
	'WHERE p.name LIKE ? '+
	'AND LOWER(a.city) = LOWER(?) '+
	'AND b.name LIKE ? '+
	'AND c.name LIKE ? '+
	'AND DISTANCE2(ST_X(a.location), ST_Y(a.location), a.city) < ? '+
	'AND CONVERT( JSON_EXTRACT( p.description, "$.""Guest Rooms"""), UNSIGNED INTEGER) > ? '+
	'GROUP BY p.id '+
	'HAVING MAX(r.capacity) > ? '
	;
const sql_search_new = 'SELECT p.id, p.name, '+
    'p.thumbnail, '+
    'p.rating, '+
    'p.description, '+
    'p.meeting_space, '+
    'p.preferred, '+
    'ST_X(a.location) AS latitude, '+
    'ST_Y(a.location) AS longitude, '+
    'a.city '+
  	'FROM property as p '+
  	'LEFT JOIN address as a '+
  	'ON a.id=p.address_id '+
  	'LEFT JOIN meeting_room as m '+
  	'ON p.id=m.property_id '+
  	'LEFT JOIN room_setup as r '+
  	'ON m.id=r.meeting_room_id '+
  	'WHERE a.city LIKE ? '+
    'AND CONVERT( JSON_EXTRACT( p.room_features, "$.Suites"), UNSIGNED INTEGER) > ? '+
    //'AND CONVERT( JSON_EXTRACT( p.meeting_space, "$.meeting_rooms"), UNSIGNED INTEGER) > ? '+
    'AND CONVERT( JSON_EXTRACT( p.meeting_space, "$.""Meeting Rooms"""), UNSIGNED INTEGER) > ? '+
    'AND CONVERT( JSON_EXTRACT( p.rating, "$[0].grade"), UNSIGNED INTEGER) BETWEEN ? AND ? '+
    'AND ((NOT ?) OR (p.preferred=1)) '+
  	'GROUP BY p.id '+
  	'HAVING MAX(r.capacity) BETWEEN ? AND ? '+
    'LIMIT ?,?'
  	;
const sql_search_new_count = 'SELECT COUNT(*) AS TotalRecords '+
        'FROM ( SELECT p.id ' +
        	'FROM property as p '+
        	'LEFT JOIN address as a '+
        	'ON a.id=p.address_id '+
        	'LEFT JOIN meeting_room as m '+
        	'ON p.id=m.property_id '+
        	'LEFT JOIN room_setup as r '+
        	'ON m.id=r.meeting_room_id '+
        	'WHERE a.city LIKE ? '+
          'AND CONVERT( JSON_EXTRACT( p.room_features, "$.Suites"), UNSIGNED INTEGER) > ? '+
          //'AND CONVERT( JSON_EXTRACT( p.meeting_space, "$.meeting_rooms"), UNSIGNED INTEGER) > ? '+
          'AND CONVERT( JSON_EXTRACT( p.meeting_space, "$.""Meeting Rooms"""), UNSIGNED INTEGER) > ? '+
          'AND CONVERT( JSON_EXTRACT( p.rating, "$[0].grade"), UNSIGNED INTEGER) BETWEEN ? AND ? '+
          'AND ((NOT ?) OR (p.preferred=1)) '+
        	'GROUP BY p.id '+
        	'HAVING MAX(r.capacity) BETWEEN ? AND ?'+
          ') AS Table1'
      	;
const sql_search_all = 	'SELECT p.id, p.name, '+
			  'p.thumbnail, '+
			  'p.rating, '+
			  'p.description, '+
			  'p.meeting_space, '+
			  'c.name as chain, '+
			  'b.name as brand '+
			'FROM property as p '+
			  'LEFT JOIN address as a '+
			  'ON a.id=p.address_id '+
			  'LEFT JOIN hotel_brand as b '+
			  'ON b.id=p.hotel_brand_id '+
			  'LEFT JOIN hotel_chain as c '+
			  'ON c.id=b.hotel_chain_id '+
			  'LEFT JOIN meeting_room as m '+
			  'ON p.id=m.property_id '+
			  'LEFT JOIN room_setup as r '+
			  'ON m.id=r.meeting_room_id '+
			'WHERE a.city LIKE ? '+
			  //'AND CONVERT( JSON_EXTRACT( p.description, "$.guest_rooms"), UNSIGNED INTEGER) > ? '+
        'AND CONVERT( JSON_EXTRACT( p.room_features, "$.""Total Guest Rooms"""), UNSIGNED INTEGER) >= ? '+
			  'GROUP BY p.id '+
			  'HAVING MAX(r.capacity) >= ? '

const sql_insert_event = 'INSERT INTO event (company_id,name,city,startdate,enddate,num_participants,num_rooms) VALUES (?,?,?,?,?,?,?)';

const sql_cities = 'SELECT DISTINCT a.city '+
		    'FROM property as p '+
		    'LEFT JOIN address as a '+
		    'ON a.id = p.address_id ';

const sql_companies = 'SELECT c.id, c.name '+
		      'FROM company_user as cu '+
		      'LEFT JOIN user as u '+
		      'ON u.id = cu.user_id '+
		      'LEFT JOIN company as c '+
		      'ON c.id = cu.company_id '+
		      'WHERE u.id = ? ';
const sql_featured_venues = 'SELECT id, name, '+
			  'thumbnail, '+
			  'rating, '+
			  'description '+
			  'FROM property '+
        'WHERE preferred=1 '+
			  'LIMIT 3 ';

//module.exports = function(router, db) {
	/*
	app.post('/hotel', (req, res) => {
    		// You'll create your note here.
    		res.send('Insert hotel');
    	});

	app.get('/hotels/:id', (req, res) => {
   		const id = req.params.id;
		con.query(sql_id, [id], function (err, result) {
  			if (err) {
				res.send({'error':'An error has occurred'});
				throw err;
			} else {
  				res.send(result);
			}
		});
  	});


	app.get('/hotels', (req, res) => {
		con.query(sql_all, function (err, result) {
  			if (err) {
				res.send({'error':'An error has occurred'});
				throw err;
			} else {
  				res.send(result);
			}
		});
  	});
  	*/
	router.get('/', function(req, res) {
		res.sendFile(path.join(__dirname,'../views','search.html'));
	});
/*	router.post('/', function(req, res) {
		var brand = (req.body.brand == null)? '%' : '%' + req.body.brand + '%';
		var chain = (req.body.chain == null)? '%' : '%' + req.body.chain + '%';
		var distance = parseInt(req.body.distance,10);
		var rooms = parseInt(req.body.rooms,10);
		var attendees = parseInt(req.body.attendees,10);
		if(isNaN(distance)){distance=100000;}
		if(isNaN(rooms)){rooms=0;}
		if(isNaN(attendees)){attendees=0;}
		var values = [
			'%' + req.body.name + '%',
			'%' + req.body.city + '%',
			brand,
			chain,
			distance,
			rooms,
			attendees,
		];
		con.query(sql_search, values,function (err, result) {
  			if (err) {
				res.send({'error':'An error has occurred'});
				throw err;
			} else {
  				res.send(result);
			}
		});
	});
*/
	router.post('/', function(req, res) {
		var rooms = parseInt(req.body.rooms,10);
		var attendees = parseInt(req.body.attendees,10);
		if(isNaN(rooms)){rooms=0;}
		if(isNaN(attendees)){attendees=0;}
		var values = [
			req.body.city,
			rooms,
			attendees
		];
		var values_ins = [
		  req.body.company,
		  req.body.name,
		  req.body.city,
		  req.body.start_date.replace("T", " ").replace("Z", ""),
		  req.body.end_date.replace("T", " ").replace("Z", ""),
		  attendees,
		  rooms];
		  con.query(sql_insert_event, values_ins,function (err1, result1) {});
		  con.query(sql_search_all, values,function (err, result) {
  			if (err) {
  				res.send({'error':'An error has occurred'});
          console.log(err);
  				//throw err;
  			} else {
    				res.send(result);
  			}
		  });
	});

  router.post('/new', function(req, res) {
    var offset = parseInt(req.body.hotelsPerPage) * parseInt(req.body.pageNumber);
    var values = [
      req.body.location,
      req.body.superior_rooms,
      req.body.event_rooms,
      req.body.value_rating.min,
      req.body.value_rating.max,
      req.body.preferred_only,
      req.body.attendees,
      req.body.value_seats.max,
      offset,
      req.body.hotelsPerPage
    ];
    //console.log("preferred_only");
    //console.log(req.body.preferred_only);
    //console.log(typeof req.body.preferred_only);

    con.query(sql_search_new, values,function (err, rows) {
      if (err) {
        res.send({'error':'An error has occurred'});
        console.log(err);
        //throw err;
      } else {
        res.send(rows);
      }
    });
  });

  router.post('/new_count', function(req, res) {
    var values = [
      req.body.location,
      req.body.superior_rooms,
      req.body.event_rooms,
      req.body.value_rating.min,
      req.body.value_rating.max,
      req.body.preferred_only,
      req.body.attendees,
      req.body.value_seats.max,
    ];
    con.query(sql_search_new_count, values,function (err, rows) {
      if (err) {
        res.send({'error':'An error has occurred'});
        console.log(err);
        //throw err;
      } else {
        res.send(rows);
      }
    });
  });


	router.get('/image', function(req, res) {
		res.sendFile(path.join(__dirname,'../views/thumbnails',req.param('filename')));
	});

	router.get("/getcities",function(req,res){
	      	con.query(sql_cities, function (err, rows, result) {
  		if (err) {
				res.send({'error':'An error has occurred'});
        console.log(err);
				//throw err;
			} else {
				var opt = [{value:'Haskovo',label:'Haskovo'},{value:'Burgas',label:'Burgas'},{value:'Varna',label:'Varna'}];
				for (var i = 0; i < rows.length; i++) {
				   opt.push({value:rows[i].city,label:rows[i].city});
				}
  				res.send(opt);
			}
		});
      });

	router.get("/getcompanies",function(req,res){
	      	con.query(sql_companies, [req.param('id')], function (err, rows, result) {
  		if (err) {
				res.send({'error':'An error has occurred'});
        console.log(err);
				//throw err;
			} else {
				var opt = [];
				for (var i = 0; i < rows.length; i++) {
				   opt.push({value:rows[i].id,label:rows[i].name});
				}
  				res.send(opt);
			}
		});
      });

	router.get("/featured",function(req,res){
		con.query(sql_featured_venues, function (err, rows, cols) {
  		if (err) {
				res.json({'error':'An error has occurred'});
        console.log(err);
				//throw err;
			} else {
  				res.json(rows);
			}
		});
	});

//con.end();
	module.exports = router;

//}
