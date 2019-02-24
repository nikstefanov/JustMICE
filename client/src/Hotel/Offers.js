import React, { Component } from 'react';
import URL from './URL'
import Head from './Components/Head';
import styles from './Style/Style.css';
import Foot from './Components/Foot';
import Switch from './Components/Switch';
import { Row,Grid,Col} from 'react-bootstrap';
import Navigation from './Components/NavHead';
import dateformat from 'dateformat'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Gmap from './Components/GMap'
class EditForm extends Component {


  constructor(){
    super()
    this.state = {
      user: [],
      rfps: [],
      opened: []
    }
    }
    componentWillMount(){
      let current = this
      fetch(URL+"/api/user/getinfo", {
            credentials: 'include',
            method: 'GET',
            headers : new Headers(),
            }).then((resp) => resp.json())
            .then(function(data) {
              if(data.error){
                document.location="/"
              }else{
                current.setState({user: data})
              }
              })
      fetch(URL+"/api/event/offers/", {
            credentials: 'include',
            method: 'GET',
            headers : new Headers(),
            }).then((resp) => resp.json())
            .then(function(data) {
              if(data.error){
              }else{
                current.setState({rfps: data})

              }
              })
    }

   render() {

    var current = this





     function collapse(id){
       var o = current.state.opened
       o[id]= (o[id]==false || o[id]==undefined);
       current.setState({opened: o})
       current.forceUpdate()
     }

     function View(id){
       document.location="/offer/"+id
     }

    function Reject(id){
      fetch(URL+"/api/event/reject/"+id, {
            credentials: 'include',
            method: 'GET',
            headers : new Headers(),
            }).then((resp) => resp.json())
            .then(function(data) {
              if(data.error){
                alert("error")
              }else{
                document.location.reload()
              }
              })
    }
     function Accept(id){
       fetch(URL+"/api/event/accept/"+id, {
             credentials: 'include',
             method: 'GET',
             headers : new Headers(),
             }).then((resp) => resp.json())
             .then(function(data) {
               if(data.error){
                 alert("error")
               }else{
                 document.location.reload()
               }
               })
     }

           var rfps = this.state.rfps.map(function(item){

             return (
               <Row className="show-grid rfpinfo" style={{color: "#000000"}}>
                 <div className="bluehead"><span style={{ marginLeft: "25px",verticalAlign: "center"}}></span><span className="headtext"> {item.offer_name} | {dateformat(new Date(item.create_date),"dd/mm/yy")} | {item.venue} | {item.status.toUpperCase()=="SENT"?"Status: Pending Acceptance":item.status.toUpperCase()}</span><div style={{float: "right", width: "20px", height: "20px", marginTop: "10px", marginRight: "5px", border: "1px solid white"}} onClick={function(){collapse(item.id)}}><img src="/images/design/white_arrow.png"/></div></div>
                 <div className="whiteheadrfp" style={{display: (!current.state.opened[item.id]?"none":"inline-block")}}>Event details</div>
                 <div className="greycontainer" style={{display: (!current.state.opened[item.id]?"none":"inline-block")}}>
                 <div className="smallinputbox">
                   <div className="smallinputboxlabelrfp">Event name</div>
                   <div className="blacktext">{item.event_name}</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Location</div>
                   <div className="blacktext">{item.city}</div>
                 </div>
                 <div className="inputbox">
                   <div className="inputboxlabelrfp">Venue</div>
                   <div className="blacktext">{item.venue}</div>
                 </div>
                 <div className="inputbox">
                   <div className="inputboxlabelrfp">Description</div>
                   <div className="blacktext" >{item.description}&nbsp;</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Arrival</div>
                   <div className="blacktext">{dateformat(new Date(item.startdate),"dd/mm/yy")}</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Departure</div>
                   <div className="blacktext">{dateformat(new Date(item.enddate),"dd/mm/yy")}</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Attendees</div>
                   <div className="blacktext">{item.num_participants}</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Event rooms</div>
                   <div className="blacktext">{item.num_eventrooms}</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Accommodation</div>
                   <div><Switch disabled={true} position={item.num_single_rooms+item.num_double_rooms+item.num_superior_rooms!=0}/></div>
                 </div>
                 {item.num_single_rooms+item.num_double_rooms+item.num_superior_rooms!=0 &&
               <span><div className="inputbox">
                 <div className="inputboxlabelrfp">Single rooms</div>
                 <div className="blacktext">{item.num_single_rooms}</div>
               </div>
               <div className="inputbox">
                 <div className="inputboxlabelrfp">Double rooms</div>
                 <div className="blacktext">{item.num_double_rooms}</div>
               </div>
               <div className="inputbox">
                 <div className="inputboxlabelrfp">Superior rooms</div>
                 <div className="blacktext">{item.num_superior_rooms}</div>
               </div></span>
             }
              <div>
               <div id="priceresult" style={{float:"right", marginRight: "32px"}}>
               <div>Total Price:</div><br/>
               <span id="price">{(item.rate_per_attendee*item.num_participants+item.length_of_stay*(item.rate_single_room*item.num_single_rooms+item.rate_double_room*item.num_double_rooms+item.rate_superior_room*item.num_superior_rooms)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>  <span id="cur">EUR</span></div>
               </div>
                   </div>
                   <a href='/assets/pdf-sample.pdf' target='_blank'><button  className="editenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){}}>View Contract</button></a>
                   <button  className="editenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){View(item.id)}}>View Details</button>
                   <button  className="editenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){Accept(item.id)}} disabled={item.status!="sent" }>Accept Offer and Contract</button>
                  <button  className="removeenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){Reject(item.id)}} disabled={item.status!="sent" }>Reject Offer</button>
               </Row>
             )
           })
           if(this.state.rfps.length==0){
             rfps = (<div className="headText1">No Offers found!</div>)
           }
        return (
          <div style={{height:"100%"}}>
          <Head/>
          <Grid>
          <div style={{minHeight: "100%"}}>
          <div className="headText1">List of Offers</div>
          <div style={{height: "28px"}}></div>
          {rfps}


          </div>
          </Grid>
          <Foot/>

          </div>
        );
    }
}

export default EditForm;
