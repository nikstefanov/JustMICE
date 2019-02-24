import React, { Component } from 'react';
import URL, { URL2 } from './URL';
import Head from './Components/Head';
import styles from './Style/Style.css';
import Foot from './Components/Foot';
import { Row,Grid,Col} from 'react-bootstrap';
import Navigation from './Components/NavHead';
import dateformat from 'dateformat'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ModalDialog from './Components/ModalDialog';
import Gmap from './Components/GMap'


class EditForm extends Component {
  constructor(){
    super()
    this.state = {
      user: [],
      ev: [],
      opened: [],
      modal_state:false,
      modal_text:'',
      modal_action: null,
    }
    this.closeModal = this.closeModal.bind(this);
    this.closeModalReload = this.closeModalReload.bind(this);
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
      fetch(URL+"/api/event/get/", {
            credentials: 'include',
            method: 'GET',
            headers : new Headers(),
            }).then((resp) => resp.json())
            .then(function(data) {
              if(data.error){
              }else{
                data.namefield=(<input type="text" name="name" id="name" className="inputField" defaultValue={data.name} />)
                console.log(data[0])
                for(var i=0;i<data.length;i++){
                  data[i].namefield=(<input type="text"  disabled name="name" id="name" className="inputFieldd" defaultValue={data[i].name} />)
                  data[i].locationfield=(<input type="text" disabled  name="city" id="city" className="inputFieldd" defaultValue={data[i].city} />)
                  data[i].arrivalfield=(<DatePicker   disabled name="startdate" id="startdate" className="inputFieldd" value={dateformat(new Date(data[i].startdate), "dd/mm/yy")} />)
                  data[i].departurefield=(<DatePicker disabled  name="enddate" id="enddate" className="inputFieldd" value={dateformat(new Date(data[i].enddate), "dd/mm/yy")} />)
                  data[i].statusfield=(<input  disabled className="inputFieldd" id="statusbox" disabled style={{textAlign: "center", color: "#ffffff", backgroundColor: data[i].status.toUpperCase()=="CONFIRMED"?"#39b54a":data[i].status.toUpperCase()=="DENIED"?"#f05c5c":"#c5d0de"}} value={data[i].status.toUpperCase()}/> )
                }
                current.setState({ev: data})
              }
              })
    }



   render() {

     var current = this
     function Delete(id){
        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        fetch(URL+"/api/event/remove/"+id, {
              credentials: 'include',
              method: 'GET',
              headers : myHeaders
              }).then((resp) => resp.json()) // Transform the data into json
              .then(function(data) {
                if(data.success==""){
                  current.setState({
                    modal_state: true,
                    modal_text:'Successfully deleted event.',
                    modal_action: current.closeModalReload,
                  });
                  //alert("Successfully deleted event")
                  //window.location.reload();
                }
                })
        }
        function Edit(id){
            var res=-1;
              for(var i=0;i<current.state.ev.length;i++){
                if(current.state.ev[i].id==id){res=i;break;}
              }
              /*
              var search_terms = {name: current.state.ev[res].name,
                          location: current.state.ev[res].city,
                          attendees: current.state.ev[res].num_participants,
                          event_rooms: current.state.ev[res].num_eventrooms,
                          accommodation:current.state.ev[res].num_single_rooms!=0||current.state.ev[res].num_double_rooms!=0||current.state.ev[res].num_superior_rooms!=0,
                          start_date: current.state.ev[res].startdate,
                          end_date: current.state.ev[res].enddate,
                          single_rooms: current.state.ev[res].num_single_rooms,
                          double_rooms: current.state.ev[res].num_double_rooms,
                          superior_rooms: current.state.ev[res].num_superior_rooms,
                          features: current.state.ev[res].features,
                          description: current.state.ev[res].description,
                          event_id: current.state.ev[res].id,
                          rfp_id: current.state.ev[res].rfp_id
                        };*/
              sessionStorage.setItem('name', current.state.ev[res].name);
              sessionStorage.setItem('location', current.state.ev[res].city);
              sessionStorage.setItem('attendees', current.state.ev[res].num_participants);
              sessionStorage.setItem('event_rooms', current.state.ev[res].num_eventrooms);
              sessionStorage.setItem('start_date', current.state.ev[res].startdate);
              sessionStorage.setItem('end_date', current.state.ev[res].enddate);
              sessionStorage.setItem('single_rooms', current.state.ev[res].num_single_rooms);
              sessionStorage.setItem('double_rooms', current.state.ev[res].num_double_rooms);
              sessionStorage.setItem('superior_rooms', current.state.ev[res].num_superior_rooms);
              //sessionStorage.setItem('features', JSON.stringify(current.state.ev[res].features));
              sessionStorage.setItem('description', current.state.ev[res].description);
              sessionStorage.setItem('event_id', current.state.ev[res].id);
              sessionStorage.setItem('rfp_id', current.state.ev[res].rfp_id);
              sessionStorage.setItem('advanced_event_options', current.state.ev[res].features );

//            sessionStorage.setItem('first_search', JSON.stringify(search_terms));
              console.log("Before fetch");

              fetch(URL2+"/select/rfp/"+current.state.ev[res].rfp_id, {
                      credentials: 'include',
                      method: 'GET',
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'},
                    }).then((resp) => resp.json())
                    .then(function(data) {
                      if(data.error){
                        //console.log("Error: "+data.error);
                        current.setState({
                          modal_state: true,
                          modal_text: data.error,
                          modal_action: current.closeModal,
                        });
                        //alert(data.error);
                      }else{
                        //current.setState({selected: data});
                      }
                    })


              document.location = "/view/event/"+current.state.ev[res].id
           }

           function collapse(id){
             var o = current.state.opened
             o[id]= (o[id]==false || o[id]==undefined);
             current.setState({opened: o})
             current.forceUpdate()
           }



        var events = this.state.ev.map(function(item){
          return (<Row className="show-grid rfpinfo">
            <div className="bluehead"><span className="headtext">{item.name}</span><div style={{float: "right", width: "20px", height: "20px", marginTop: "10px", marginRight: "5px", border: "1px solid white"}} onClick={function(){collapse(item.id)}}><img src="/images/design/white_arrow.png"/></div></div>
            <div className="greycontainer" style={{display: (!current.state.opened[item.id]?"none":"inline-block")}}>
            <div className="inputbox">
              <div className="inputboxlabel">Name</div>
              <div>{item.namefield}</div>
            </div>
            <div className="inputbox">
              <div className="inputboxlabel">Location</div>
              <div>{item.locationfield}</div>
            </div>
            <div className="smallinputbox">
              <div className="smallinputboxlabel">Status</div>
              <div >{item.statusfield}</div>
            </div>
            <div className="inputbox">
              <div className="inputboxlabel">Arrival</div>
              <div>{item.arrivalfield}</div>
            </div>
            <div className="inputbox">
              <div className="inputboxlabel">Departure</div>
              <div>{item.departurefield}</div>
            </div>


            </div>
                <button  className="removeenent" style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){Delete(item.id)}}>DELETE EVENT</button><button style={{display: (!current.state.opened[item.id]?"none":"inline-block")}} onClick={function(){Edit(item.id)}} className="editenent">EDIT EVENT</button>
          </Row>)
        })
        if(events.length==0){
          events = (<div className="headText1">No events found!</div>)
        }
        return (
          <div style={{height:"100%"}}>
            <ModalDialog show={this.state.modal_state} text={this.state.modal_text}
              left_button="OK" onLeftButtonClick={this.state.modal_action}
              />
            <Head/>
            <div style={{minHeight: "100%",backgroundColor: "#fafafa"}}>
              <div className="headText1">Your events</div>
              <div style={{height: "28px"}}></div>
              {events}
            </div>
            <Foot/>
          </div>
        );
    }

    closeModal(){
      this.setState({modal_state:false});
    }

    closeModalReload(){
      this.setState({modal_state:false});
      window.location.reload();
    }

}


export default EditForm;
