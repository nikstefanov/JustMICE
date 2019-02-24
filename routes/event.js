const mysql = require('mysql');
const path = require("path");
var con = mysql.createConnection(
    require("../config/db")
);
var express = require("express");
var router = express.Router();

con.connect();

router.get('/get/:id', function(req, res) {
  if (!req.session.user){res.json({error: "You cannot read info about this event."});return;}
  id = req.params.id
  con.query("select event.* from event  where event.id=?",[id],function(err,events,fields){
    if(events.length==0){res.json({error: "No events has been found"});return;}
    con.query("select * from company_user where company_id=? AND user_id=?",[events[0].company_id,req.session.user.id],function(err,r,f){
      con.query("select * from rfp where event_id=?",[events[0].id],function(err,rfps,f){
        if(rfps[0].status == 'deleted'){res.json({error: "The event has been deleted"});return;}
        if(r.length>0){
          res.json(events[0])
        }else{
          res.json({error: "You cannot read info about this event."})
        }
      })
    })
  })
});

router.get("/reject/:id",function(req,res){
  con.query("select offer.id as c from user join company_user on company_user.user_id=user.id join event on event.company_id=company_user.company_id join offer on offer.event_id=event.id where user.id=? and offer.id=?",[req.session.user.id,req.params.id],function(err,r,f){
    if(err){res.json({error: err});throw err}
    if(r.length!=0){
      con.query("update offer set status='rejected' where offer.id=?",[req.params.id],function(err){
        if(err){res.json({error: err});throw err}
        res.json({success: "success"})
      })
    }
  })
})
router.get("/accept/:id",function(req,res){
  con.query("select offer.id as c from user join company_user on company_user.user_id=user.id join event on event.company_id=company_user.company_id join offer on offer.event_id=event.id where user.id=? and offer.id=?",[req.session.user.id,req.params.id],function(err,r,f){
    if(err){res.json({error: err});throw err}
    if(r.length!=0){
      con.query("update offer set status='accepted' where offer.id=?",[req.params.id],function(err){
        if(err){res.json({error: err});throw err}
        res.json({success: "success"})
      })
    }
  })
})

router.get("/count", function(req,res){
  if (!req.session.user){res.json({error: "You cannot read info about this event."});return;}
  con.query("select count(*) as c from user join company_user on company_user.user_id=user.id join event on event.company_id=company_user.company_id join offer on offer.event_id=event.id where user.id=? and offer.status='sent'",[req.session.user.id],function(err,r,f){
    res.json({success: r[0].c, user: req.session.user})
  })
})
router.get("/offer/:id",function(req,res){
  if (!req.session.user){res.json({error: "You cannot read info about this event."});return;}
  con.query("select  event.* ,offer.*,  event.name as event_name, company.name as company_name, address.*, currency.currency_code as currency, offer.name as offer_name, offer.contact_person_name, property.name as venue from user join company_user on company_user.user_id=user.id join event on event.company_id=company_user.company_id join offer on offer.event_id=event.id join property on property.id=offer.property_id join currency on currency.id=offer.currency_id join company on event.company_id=company.id join address on company.address_id=address.id where user.id=? and offer.status!='deleted' and offer.status!='unsent' and offer.id=?",[req.session.user.id,req.params.id],function(err,r,f){
    con.query("SELECT meeting_room.id,meeting_room.name,images,date_from,date_to,capacity,setup_type_id,layout FROM meeting_room_offer join room_setup on room_setup.id=room_setup_id join meeting_room on meeting_room_offer.meeting_room_id=meeting_room.id join setup_type on setup_type.id=setup_type_id where offer_id=?",[req.params.id],function(err,mrooms,f){
        if(err)throw err
        res.json({offer: r[0], mrooms: mrooms})
    })
  })
})
router.get("/offers",function(req,res){
  if (!req.session.user){res.json({error: "You cannot read info about this event."});return;}
  con.query("select  event.* ,offer.*, event.name as event_name, offer.name as offer_name, property.name as venue from user join company_user on company_user.user_id=user.id join event on event.company_id=company_user.company_id join offer on offer.event_id=event.id join property on property.id=offer.property_id where user.id=? and offer.status!='deleted' and offer.status!='unsent' order by offer.id desc",[req.session.user.id],function(err,r,f){
    res.json(r)
  })
})
router.get('/get', function(req, res) {
  if (!req.session.user){res.json({error: "You cannot read info about this event."});return;}
  con.query("select * from company_user where user_id=?",[req.session.user.id],function(err,r,f){
    con.query("select x.*,rfp.status, rfp.id as rfp_id from (select event.*, event.name as eventname, a.name as company_name, a.adr1 as adr1, a.adr2 as adr2, a.zip as zip from event  join (select company.*,address.address_line1 as adr1, address.address_line2 as adr2, address.zip as zip from company join address on company.address_id=address.id) as a on company_id=a.id) as x join rfp on rfp.event_id=x.id where company_id=? and rfp.status!='deleted' order by x.id desc",[r[0].company_id],function(err,events,fields){
      if(events.length>0){
        res.json(events)
      }else{
        res.json({error: "No events found."})
      }
    })
  })
});
router.post("/submit",function(req,res){
  let p = req.body
  con.query("select * from company_user where company_id=? AND user_id=?",[p.company_id,req.session.user.id],function(err,r,f){
      if(r.length==0){res.json({error: "You cannot edit this event."})}
      con.query("update rfp set currency_id=?, name=?, status='sent', terms=? where event_id=?", [p.currency, p.name, JSON.stringify({response_date: p.hearfromvenues, contact: p.preffer, phone: p.phone,email: req.session.user.email, other_terms: p.terms }),p.id], function(err){
        if(err){res.json({error: err});return;}
        con.query("update event set name=?, city=?, description=?, startdate=STR_TO_DATE(?,'%d/%m/%Y'), enddate=STR_TO_DATE(?,'%d/%m/%Y'),num_participants=?,  num_eventrooms =?,num_single_rooms=?, num_double_rooms=?, num_superior_rooms=?, features=? where id=?", [p.eventname,p.city,p.description,p.startdate,p.enddate,p.attendees,p.eventrooms,p.single,p.double,p.superior,p.features,p.id],function(err){
          if(err){res.json({error: err});return;}
          res.json({success: "ok"})
        })
      })
    })
})
router.get('/remove/:id', function(req, res) {
  id = parseInt(req.params.id,10)
    con.query("update rfp set status='deleted' where event_id=?",[id],function(err){
      if(!err)res.json({success: ""})
      else {res.json({error: err})}
    })
});
module.exports = router;
