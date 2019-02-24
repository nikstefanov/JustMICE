import React from 'react';
import styles from '../Style/Style.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Switch from '../Components/Switch';
import ModalDialog from '../Components/ModalDialog';
import NumericInputPlusMinus from '../Components/NumericInputPlusMinus';
import 'react-datepicker/dist/react-datepicker.css';

class Event_Details extends React.Component {
  constructor(props) {
    super(props);
    //var first_search = JSON.parse(sessionStorage.getItem('first_search'));
    this.state={
      name: (sessionStorage.getItem('name'))?sessionStorage.getItem('name'):'',
      location: (sessionStorage.getItem('location'))?sessionStorage.getItem('location'):'',
      attendees: (sessionStorage.getItem('attendees'))?sessionStorage.getItem('attendees'):0,
      event_rooms: (sessionStorage.getItem('event_rooms'))?sessionStorage.getItem('event_rooms'):0,
      start_date: (sessionStorage.getItem('start_date'))?moment(sessionStorage.getItem('start_date')):moment(),
      end_date: (sessionStorage.getItem('end_date'))?moment(sessionStorage.getItem('end_date')):moment(),
      single_rooms: (sessionStorage.getItem('single_rooms'))?sessionStorage.getItem('single_rooms'):0,
      double_rooms: (sessionStorage.getItem('double_rooms'))?sessionStorage.getItem('double_rooms'):0,
      superior_rooms: (sessionStorage.getItem('superior_rooms'))?sessionStorage.getItem('superior_rooms'):0,
      preferred_only: (sessionStorage.getItem('preferred_only')==='true')?true:false,

      modal_state:false,
      modal_text:'',

      accommodation:false,
      errors: '',
    };
    if((this.state.single_rooms + this.state.double_rooms + this.state.superior_rooms)>0) this.state.accommodation=true;

    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.validate = this.validate.bind(this);
    //console.log(moment());
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

  handleChangeStartDate(date) {
    //var date1 = JSON.stringify(date).replace("T", " ").replace("Z", "");
    //console.log(typeof date);console.log(date);
    var end_date_new = date.clone().add(1, 'days');
    this.setState({start_date: date, end_date: end_date_new});
  }
  handleChangeEndDate(date) {
    //var date1 = JSON.stringify(date).replace("T", " ").replace("Z", "");
    this.setState({end_date: date});
  }

  render(){
    return(
      <div className={styles.event_details_container}>
        <ModalDialog show={this.state.modal_state} text={this.state.modal_text}
          left_button="OK"
          onLeftButtonClick={()=>this.setState({modal_state:false})}
          />
        <span className={styles.event_details_header}>
          Enter your event details
        </span>
        <span className={styles.event_details_sub_header}>

        </span>
        <span className={styles.event_details_event_name_header}>
          Event name
        </span>
        <span className={styles.event_details_location_header}>
          Location*
        </span>
        <input type="text" placeholder="e.g. My Cool Event" className={styles.event_details_event_name_field} value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
        <input type="text" placeholder="Location" className={styles.event_details_location_field} value={this.state.location} onChange={event => this.setState({location: event.target.value})}/>
        <span className={styles.event_details_arrival_header}>
          Arrival*
        </span>
        <div className={styles.event_details_arrival_container}>
          <DatePicker name="start_date" placeholderText="DD/MM/YYYY" popperPlacement="bottom" className={styles.event_details_arrival_field}
            dateFormat="DD/MM/YYYY" selected={this.state.start_date} onChange={this.handleChangeStartDate} />
        </div>
        <span className={styles.event_details_departure_header}>
          Departure*
        </span>
        <div className={styles.event_details_departure_container}>
          <DatePicker name="end_date" placeholderText="DD/MM/YYYY" popperPlacement="bottom" className={styles.event_details_departure_field}
            dateFormat="DD/MM/YYYY" selected={this.state.end_date} onChange={this.handleChangeEndDate} />
        </div>
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
        <span className={styles.event_details_accommodation_header}>
          Accommodation required?
        </span>
        <div className={this.state.accommodation?
          (styles.event_details_accommodation_slider_1):
          (styles.event_details_accommodation_slider_0)} />
        <div className={this.state.accommodation?
          (styles.event_details_accommodation_button_1):
          (styles.event_details_accommodation_button_0)}
          onClick={this.changeAccommodation.bind(this)}/>
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
        <span className={styles.event_details_preferred_venues_header}>
          Preferred venues only?
        </span>
        <span className={styles.event_details_preferred_venues_container}>
          <Switch position={this.state.preferred_only} onClick={value => this.setState({preferred_only:value})}/>
        </span>
        <span className={styles.event_details_start_request_button} onClick={this.handleButtonClick}>
          <span className={styles.event_details_start_request_text}>
            START REQUEST
          </span>
        </span>
      </div>
    );
  }

  changeAccommodation(event){
    event.preventDefault();
    if(this.state.accommodation){
      this.setState({single_rooms: 0, double_rooms: 0, superior_rooms: 0});
    }
    this.setState((prevState, props) => ({
      accommodation: !prevState.accommodation
    }));
  }

  handleButtonClick(event){
    event.preventDefault();
    var err = this.validate();
    if(err.length==0){
      //sessionStorage.setItem('first_search', JSON.stringify(this.state));

      sessionStorage.setItem('name', this.state.name);
      sessionStorage.setItem('location', this.state.location);
      sessionStorage.setItem('attendees', this.state.attendees);
      sessionStorage.setItem('event_rooms', this.state.event_rooms);
      sessionStorage.setItem('start_date', this.state.start_date);
      sessionStorage.setItem('end_date', this.state.end_date);
      sessionStorage.setItem('single_rooms', this.state.single_rooms);
      sessionStorage.setItem('double_rooms', this.state.double_rooms);
      sessionStorage.setItem('superior_rooms', this.state.superior_rooms);
      sessionStorage.setItem('preferred_only', this.state.preferred_only);

      window.location = '/search_results';
    }else{
      this.setState({modal_state:true, modal_text: err});
      //alert(err);
    }
  }


}
export default Event_Details;
