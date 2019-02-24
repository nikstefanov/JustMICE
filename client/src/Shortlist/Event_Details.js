import React, { Component } from 'react';
import URL, { URL2 } from '../URL';
import Switch from '../Components/Switch';
import NumericInputPlusMinus from '../Components/NumericInputPlusMinus';
import styles from '../Style/Shortlist.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class Event_Details extends React.Component {
  constructor(props) {
    super(props);
    //console.log(sessionStorage.getItem('features'));
    //console.log(typeof sessionStorage.getItem('features'));
  /*  var features;
    if(sessionStorage.getItem('features')){
      features = JSON.parse(sessionStorage.getItem('features'));
    }else{
      features={
        projector: false,
        flip_chart: false,
        tea_coffee: false,
        web_server: false,
        requirement: false,
      };
    } */
    this.state = {
                  name: (sessionStorage.getItem('name'))?sessionStorage.getItem('name'):'',
                  location: (sessionStorage.getItem('location'))?sessionStorage.getItem('location'):'',
                  attendees: (sessionStorage.getItem('attendees'))?sessionStorage.getItem('attendees'):0,
                  event_rooms: (sessionStorage.getItem('event_rooms'))?sessionStorage.getItem('event_rooms'):0,
                  start_date: (sessionStorage.getItem('start_date'))?moment(sessionStorage.getItem('start_date')):moment(),
                  end_date: (sessionStorage.getItem('end_date'))?moment(sessionStorage.getItem('end_date')):moment(),
                  single_rooms: (sessionStorage.getItem('single_rooms'))?sessionStorage.getItem('single_rooms'):0,
                  double_rooms: (sessionStorage.getItem('double_rooms'))?sessionStorage.getItem('double_rooms'):0,
                  superior_rooms: (sessionStorage.getItem('superior_rooms'))?sessionStorage.getItem('superior_rooms'):0,
                  description: (sessionStorage.getItem('description'))?sessionStorage.getItem('description'):'',
/*                  projector: features.projector,
                  flip_chart: features.flip_chart,
                  tea_coffee: features.tea_coffee,
                  web_server: features.web_server,
                  requirement: features.requirement,
  */                accommodation: false,
                 }

      if((this.state.single_rooms + this.state.double_rooms + this.state.superior_rooms)>0) this.state.accommodation=true;
      if(this.props.getData){
        this.props.getData(this.getStateOfComponent.bind(this));
      }
      this.validate = this.validate.bind(this);
      this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if(this.props.onClick){this.props.onClick();}
  }

  validate(){
    var err="";
    if (!this.state.location || !this.state.location.length){
      err += "Please, supply a location.\r\n";
    }
    if (this.state.start_date==''){
      err += "Please, supply a start date.\r\n";
    }
    if (this.state.end_date==''){
      err += "Please, supply a end date.\r\n";
    }
    return err;
  }

  getStateOfComponent(){
    var err = this.validate();
    if(err.length==0){
      return this.state;
    }else{
      alert(err);
      return null;
    }
  }

  changeAccommodation(pos){
    //event.preventDefault();
    if(this.state.accommodation){
      this.setState({single_rooms: 0, double_rooms: 0, superior_rooms: 0});
    }
    this.setState((prevState, props) => ({
      accommodation: !prevState.accommodation
    }));
  }

  render(){

    return(
      <div className={styles.event_details_container}>
        <span className={styles.event_details_header_container}>
          <span className={styles.event_details_header_text}>
            Event details
          </span>
        </span>
        <input type="text" placeholder="Event Name" className={styles.event_details_event_name} name="name" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
        <input type="text" placeholder="Event Type" className={styles.event_details_event_type} name="type" value={this.state.description} onChange={event => this.setState({description: event.target.value})}/>
        <span className={styles.event_details_arrival_title}>Arrival*</span>
        <div className={styles.event_details_arrival_container}>
          <DatePicker name="start_date" placeholderText="DD/MM/YYYY" popperPlacement="bottom" className={styles.event_details_arrival_field}
            dateFormat="DD/MM/YYYY" selected={this.state.start_date}  onChange={(date)=>this.setState({start_date: date})} />
        </div>
        <span className={styles.event_details_departure_title}>Departure</span>
        <div className={styles.event_details_departure_container}>
          <DatePicker name="end_date" placeholderText="DD/MM/YYYY" popperPlacement="bottom" className={styles.event_details_departure_field}
            dateFormat="DD/MM/YYYY" selected={this.state.end_date} onChange={(date) => this.setState({end_date: date})}/>
        </div>
        <span className={styles.event_details_location_title}>Location*</span>
        <input type="text" placeholder="Location" className={styles.event_details_location_field} name="location" value={this.state.location} />{/*onChange={event => this.setState({location: event.target.value})}*/}
        <span className={styles.event_details_accommodation_title}>Accommodation required?</span>
        <span className={styles.event_details_accommodation_container}>
          <Switch position={this.state.accommodation} onClick={this.changeAccommodation.bind(this)}/>
        </span>
        <span className={styles.event_details_numb_att_header}>
          Number of attendees
        </span>
        <div className={styles.event_details_numb_att_field}>
          <NumericInputPlusMinus value={this.state.attendees} onChange={value => this.setState({attendees:value})}/>
        </div>
        <span className={styles.event_details_event_rooms_header}>
          Event rooms
        </span>
        <div className={styles.event_details_event_rooms_field}>
          <NumericInputPlusMinus value={this.state.event_rooms} onChange={value => this.setState({event_rooms:value})}/>
        </div>
        {this.state.accommodation &&
          <span>
            <span className={styles.event_details_single_rooms_header}>
              Single rooms
            </span>
            <div className={styles.event_details_single_rooms_field}>
              <NumericInputPlusMinus value={this.state.single_rooms} onChange={value => this.setState({single_rooms:value})}/>
            </div>
            <span className={styles.event_details_double_rooms_header}>
              Double rooms
            </span>
            <div className={styles.event_details_double_rooms_field}>
              <NumericInputPlusMinus value={this.state.double_rooms} onChange={value => this.setState({double_rooms:value})}/>
            </div>
            <span className={styles.event_details_superior_rooms_header}>
              Superior rooms
            </span>
            <div className={styles.event_details_superior_rooms_field}>
              <NumericInputPlusMinus value={this.state.superior_rooms} onChange={value => this.setState({superior_rooms:value})}/>
            </div>
          </span>
        }
        <span className={styles.event_details_advanced_button} onClick={this.onClick}>
          <span className={styles.event_details_advanced_button_text}>ADVANCED</span>
        </span>

      </div>
    );
  }

/*
<div className={styles.event_details_separator}/>
<input type="checkbox" className={styles.event_details_projector_field} value="projector" checked={this.state.projector} onChange={()=>this.setState({projector: !this.state.projector})}/>
<span className={styles.event_details_projector_header}>Projector</span>
<input type="checkbox" className={styles.event_details_flip_chart_field} value="flip_chart" checked={this.state.flip_chart} onChange={()=>this.setState({flip_chart: !this.state.flip_chart})}/>
<span className={styles.event_details_flip_chart_header}>Flip chart</span>
<input type="checkbox" className={styles.event_details_tea_coffee_field} value="tea_coffee" checked={this.state.tea_coffee} onChange={()=>this.setState({tea_coffee: !this.state.tea_coffee})}/>
<span className={styles.event_details_tea_coffee_header}>Serve tea and coffee at start time</span>
<input type="checkbox" className={styles.event_details_web_server_field} value="web_server" checked={this.state.web_server} onChange={()=>this.setState({web_server: !this.state.web_server})}/>
<span className={styles.event_details_web_server_header}>Web server</span>
<input type="checkbox" className={styles.event_details_requirement_field} value="requirement" checked={this.state.requirement} onChange={()=>this.setState({requirement: !this.state.requirement})}/>
<span className={styles.event_details_requirement_header}>Requirement</span>

*/



}
export default Event_Details;
