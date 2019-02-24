import React, { Component } from 'react';
import URL from '../URL'
import Head from './Head';
import styles from '../Style/Style.css';
import Foot from '../Components/Foot';
import Switch from '../Components/Switch';
import { Row,Grid,Col} from 'react-bootstrap';
import Navigation from '../Components/NavHead';
import dateformat from 'dateformat'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Gmap from '../Components/GMap'
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
      fetch(URL+"/api/offer/offers/", {
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

     function ViewOffer(id,event_id){
       document.location="/view/view/"+event_id+"/"+id
     }

    function EditOffer(id,event_id){
      document.location="/view/edit/"+event_id+"/"+id
    }
     function DeleteOffer(id){
       fetch(URL+"/api/offer/delete/"+id, {
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
                 <div className="bluehead"><span style={{ marginLeft: "25px",verticalAlign: "center"}}></span><span className="headtext"> {item.offer_name} | {dateformat(new Date(item.create_date),"dd/mm/yy")} |  {item.company_name} | {item.venue} | {item.status.toUpperCase()}</span><div style={{float: "right", width: "20px", height: "20px", marginTop: "10px", marginRight: "5px", border: "1px solid white"}} onClick={function(){collapse(item.id)}}><img src="/images/design/white_arrow.png"/></div></div>
                 <div className="whiteheadrfp" style={{display: (!current.state.opened[item.id]?"none":"inline-block")}}>Event details</div>
                 <div className="greycontainer" style={{display: (!current.state.opened[item.id]?"none":"inline-block")}}>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Event name</div>
                   <div className="blacktext">{item.event_name}</div>
                 </div>
                 <div className="inputbox">
                   <div className="inputboxlabelrfp">Venue</div>
                   <div className="blacktext">{item.venue}</div>
                 </div>
                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Location</div>
                   <div className="blacktext">{item.city}</div>
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
                 <div className="inputbox">
                   <div className="inputboxlabelrfp">Attendees</div>
                   <div className="blacktext">{item.num_participants}</div>
                 </div>

                 <div className="smallinputbox">
                   <div className="inputboxlabelrfp">Accommodation</div>
                   <div><Switch disabled={true} position={item.num_single_rooms+item.num_double_rooms+item.num_superior_rooms!=0}/></div>
                 </div>
               <div className="inputbox">
                 <div className="inputboxlabelrfp">Company name</div>
                 <div className="blacktext">{item.company_name}</div>
               </div>
               <div className="inputbox">
                 <div className="inputboxlabelrfp">Contact person</div>
                 <div className="blacktext">{item.contact_person_name}</div>
               </div>
               <div className="inputbox">
                 <div className="inputboxlabelrfp">Contact</div>
                 <div className="blacktext">{item.contact_details}</div>
               </div>
               <div id="priceresult" style={{float:"right", marginRight: "32px"}}>
               Total Price:<br/>
               <span id="price">{(item.rate_per_attendee*item.num_participants+item.length_of_stay*(item.rate_single_room*item.num_single_rooms+item.rate_double_room*item.num_double_rooms+item.rate_superior_room*item.num_superior_rooms)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>  <span id="cur">EUR</span>
               </div>
                   </div>
                   <button  className="editenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){ViewOffer(item.id,item.event_id)}}>View Details</button>
                   <button  className="editenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){EditOffer(item.id,item.event_id)}} disabled={item.status!="unsent" }>Edit Offer</button>
                  <button  className="removeenent" style={{margin: "11px", width: "176px", height: "46px"}}  style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){DeleteOffer(item.id)}} disabled={item.status=="sent" }>Delete Offer</button>
               </Row>
             )
           })
           if(this.state.rfps.length==0){
             rfps = (<div className="headText1">No Offers found!</div>)
           }
        return (
          <div style={{height:"100%"}}>
          <Grid>
          <Head/>
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
