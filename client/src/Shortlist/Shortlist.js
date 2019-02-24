import React, { Component } from 'react';
import URL, { URL2 } from '../URL';
import Navigation from './Navigation';
import Head from '../Components/Head';
import Foot from '../Components/Foot';
import { Row,Grid,Col } from 'react-bootstrap';
import styles from '../Style/Shortlist.css';
import HotelInfoBox from './HotelInfoBox';
import Event_Details from './Event_Details';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import AdvancedEventOptions from './AdvancedEventOptions';
import 'react-input-range/lib/css/index.css'

class Shortlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  rfp_id: (sessionStorage.getItem('rfp_id') && sessionStorage.getItem('rfp_id') != 'undefined')?sessionStorage.getItem('rfp_id'):0,
                  event_id: (sessionStorage.getItem('event_id') && sessionStorage.getItem('event_id') != 'undefined')?sessionStorage.getItem('event_id'):0,
                  //selected_ids: (sessionStorage.getItem('selected_ids') && sessionStorage.getItem('selected_ids') != 'undefined')?JSON.parse(sessionStorage.getItem('selected_ids')):[],
                  selected:[],
                  advanced_options_show: false,
                 };
    this.handleHotelRemove = this.handleHotelRemove.bind(this);
    this.onAdvancedOptionsSaveClick = this.onAdvancedOptionsSaveClick.bind(this);
    this.onEventDetailsAdvancedClick = this.onEventDetailsAdvancedClick.bind(this);
  }

  componentWillMount(){
    let current = this;

    fetch(URL2+"/user/getinfo", {
          credentials: 'include',
          method: 'GET',
          headers : new Headers(),
          }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
              document.location="/"
            }else{
              if(data.userroles_id !=3){
                document.location="/"
              }
            }
            })

    var url;
    //console.log(this.state.rfp_id);
    /*if(this.state.rfp_id){
      url = URL2+"/select/rfp"
    }else{*/
      url = URL2+"/select/all"
    //}
    fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify({
              rfp_id: this.state.rfp_id,
              event_id: this.state.event_id,
            })
          }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
              //console.log("Error: "+data.error);
              alert(data.error);
            }else{
              current.setState({selected: data});
            }
            })
  }

  onAdvancedOptionsSaveClick(){
    this.setState({advanced_options_show: false});
  }

  onEventDetailsAdvancedClick(){
    this.setState({advanced_options_show: true});
  }




render(){
  var hotelBoxList = [];
  for (var i = 0; i < this.state.selected.length; i++ ){
    hotelBoxList.push(
      <div>
        <HotelInfoBox propertyInfo={this.state.selected[i]} buttonTitle="REMOVE" handleButtonClick={this.handleHotelRemove}/>
      </div>
    );
  }



  return(
    <div >
      <AdvancedEventOptions
      disabled={false}
        show={this.state.advanced_options_show}
        onClick={this.onAdvancedOptionsSaveClick}
      />
      <Head/>
      <div className={styles.outer_grid}>
        <Grid className={styles.grid}>
          <Row>
            <Col mdHidden smHidden xsHidden lg={12}>
              <div className={styles.navigation}>
                <Navigation />
              </div>
            </Col>
          </Row>
          <Row>

            <Col md={12} lg={5}>
              <Event_Details getData={func => this.getEvent_Details = func} onClick={this.onEventDetailsAdvancedClick}/>
            </Col>
            <Col md={12} lg={7}>
              <div>
                {hotelBoxList}
                <div className={styles.shortlist_buttons}>
                  <span className={styles.reset_shortlist_button}
                    onClick={this.removeAllVenues.bind(this)}>
                    <span className={styles.reset_shortlist_button_text}>
                      RESET SHORTLIST
                    </span>
                  </span>
                  <span className={styles.review_rfp_button}
                    onClick={this.review_rfp.bind(this)}>
                    <span className={styles.review_rfp_button_text}>
                      REVIEW RFP
                    </span>
                  </span>
                </div>
              </div>
            </Col>

          </Row>
        </Grid>
      </div>
      <Foot/>
    </div>

  );
}
/*
            <Col mdHidden smHidden xsHidden lg={2}/>
                        <Col mdHidden smHidden xsHidden lg={3}/>

*/
  removeAllVenues(event){//RemoveAll
    //console.log(venueId);
    this.setState({selected:[]});
    event.preventDefault();
    fetch(`${URL2}/select/remove/all`, {
          credentials: 'include',
          method: 'GET',
        }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
                alert(data.error);
            }else{

            }
          })

      //this.setState({selected_ids:[]});
  }

  review_rfp(event){
    //console.log(this.getEvent_Details());
    var ev_details = this.getEvent_Details();
    if(ev_details){
      var ev_features = /*{
        projector: ev_details.projector,
        flip_chart: ev_details.flip_chart,
        tea_coffee: ev_details.tea_coffee,
        web_server: ev_details.web_server,
        requirement: ev_details.requirement,
      }*/
        (sessionStorage.getItem('advanced_event_options')) ? JSON.parse(sessionStorage.getItem('advanced_event_options')):{};

      sessionStorage.setItem('name', ev_details.name);
      //sessionStorage.setItem('location', ev_details.location);
      sessionStorage.setItem('attendees', ev_details.attendees);
      sessionStorage.setItem('event_rooms', ev_details.event_rooms);
      sessionStorage.setItem('start_date', ev_details.start_date);
      sessionStorage.setItem('end_date', ev_details.end_date);
      sessionStorage.setItem('single_rooms', ev_details.single_rooms);
      sessionStorage.setItem('double_rooms', ev_details.double_rooms);
      sessionStorage.setItem('superior_rooms', ev_details.superior_rooms);
      sessionStorage.setItem('description', ev_details.description);
      //sessionStorage.setItem('features', JSON.stringify(ev_features));

      let current = this;
      var url = URL2 + ((this.state.event_id) ? "/event_details/update" : "/event_details/insert");
      console.log(this.state.event_id);
      fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        event_id: current.state.event_id,
        rfp_id: current.state.rfp_id,
        name: ev_details.name,
        location: ev_details.location,
        attendees: ev_details.attendees,
        event_rooms: ev_details.event_rooms,
        start_date: ev_details.start_date,
        end_date: ev_details.end_date,
        single_rooms: ev_details.single_rooms,
        double_rooms: ev_details.double_rooms,
        superior_rooms: ev_details.superior_rooms,
        type: ev_details.description,
        features: ev_features,//current.state.advanced_options_value
        selected: this.state.selected.map((hotel)=>hotel.id)
      })
        }).then((resp) => resp.json()).then(function(data){
          if(data.error){
            //console.log(data);
            alert(data.error);
          }else{
            //console.log(data);
            sessionStorage.setItem('event_id', data.event_id);
            sessionStorage.setItem('rfp_id', data.rfp_id);
            //sessionStorage.setItem('selected', JSON.stringify(current.state.selected));
            window.location = '/view/event/' + data.event_id;
          }
        })
      }
  }

  handleHotelRemove(venueId,event){
    //console.log(venueId);
    this.setState({selected: this.state.selected.filter(hotel => hotel.id != venueId)});/*
    this.setState({selected_ids:
      this.state.selected_ids.filter((id)=> id!=venueId)
    });*/
  }

}

export default Shortlist;
