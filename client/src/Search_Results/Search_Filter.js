import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import URL, { URL2 } from '../URL';
import Switch from '../Components/Switch';
import Checkbox from '../Components/Checkbox';
import NumericInputPlusMinus from '../Components/NumericInputPlusMinus';
import styles from '../Style/Search_Results.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ModalDialog from '../Components/ModalDialog';
import InputRange from 'react-input-range';
import 'react-datepicker/dist/react-datepicker.css';
import '../Style/Search_Results_InputRange.css';

class Search_Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {valuePrice: {min: 790, max: 1020,},
                  valueSeats: this.props.value_seats,
                  valueRating: this.props.value_rating,
                  location:this.props.location,
                  attendees: this.props.attendees,
                  event_rooms: this.props.event_rooms,
                  start_date: moment(this.props.start_date),
                  end_date: moment(this.props.end_date),
                  single_rooms: this.props.single_rooms,
                  double_rooms: this.props.double_rooms,
                  preferred_only: this.props.preferred_only,
                  errors: '',
                  modal_state:false,
                  modal_text:'',
      };


      this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
      this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.validate = this.validate.bind(this);

      //console.log(this.props.search);
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
    this.setState({start_date: date});
  }
  handleChangeEndDate(date) {
    //var date1 = JSON.stringify(date).replace("T", " ").replace("Z", "");
    this.setState({end_date: date});
  }

  handleButtonClick(event){
    event.preventDefault();
    var err = this.validate();
    if(err.length==0){
      if(this.props.onNewSearch){
        var criteria={location: this.state.location,
                      attendees: this.state.attendees,
                      event_rooms: this.state.event_rooms,
                      single_rooms: this.state.single_rooms,
                      double_rooms: this.state.double_rooms,
                      start_date: this.state.start_date,
                      end_date: this.state.end_date,
                      value_rating: this.state.valueRating,
                      value_seats: this.state.valueSeats,
                      preferred_only: this.state.preferred_only,
        }
        this.props.onNewSearch(criteria, event);
      }
      //sessionStorage.setItem('first_search', JSON.stringify(this.state));
    }else{
      //alert(err);
      this.setState({modal_state:true, modal_text: err});
    }
  }

  /*<span className={styles.search_filter_superior_rooms_header}>
    Superior rooms
  </span>
  <div className={styles.search_filter_superior_rooms_field}>
    <NumericInputPlusMinus value={0}/>
  </div>*/


  render(){

    return(
      <div className={styles.search_filter_container}>
        <ModalDialog show={this.state.modal_state} text={this.state.modal_text}
          left_button="OK" onLeftButtonClick={()=>this.setState({modal_state:false})}
          />
        <span className={styles.search_filter_header_container}>
          <span className={styles.search_filter_header_text}>
            Filter
          </span>
        </span>
        <span className={styles.search_filter_arrival_title}>Arrival*</span>
        <div className={styles.search_filter_arrival_container}>
          <DatePicker name="start_date" placeholderText="DD/MM/YYYY" popperPlacement="bottom" className={styles.search_filter_arrival_field}
            dateFormat="DD/MM/YYYY" selected={this.state.start_date} onChange={this.handleChangeStartDate} />
        </div>
        <span className={styles.search_filter_departure_title}>Departure</span>
        <div className={styles.search_filter_departure_container}>
          <DatePicker name="end_date" placeholderText="DD/MM/YYYY" popperPlacement="bottom" className={styles.search_filter_departure_field}
            dateFormat="DD/MM/YYYY" selected={this.state.end_date} onChange={this.handleChangeEndDate}/>
        </div>
        <span className={styles.search_filter_location_title}>Location*</span>
        <input type="text" placeholder="Location" className={styles.search_filter_location_field} name="location" value={this.state.location} onChange={event => this.setState({location: event.target.value})}/>
        <span className={styles.search_filter_numb_att_header}>
          Number of attendees
        </span>
        <div className={styles.search_filter_numb_att_field}>
          <NumericInputPlusMinus value={this.state.attendees} onChange={value => this.setState({attendees:value})}/>
        </div>
        <span className={styles.search_filter_event_rooms_header}>
          Event rooms
        </span>
        <div className={styles.search_filter_event_rooms_field}>
          <NumericInputPlusMinus value={this.state.event_rooms} onChange={value => this.setState({event_rooms:value})}/>
        </div>
        <span className={styles.search_filter_single_rooms_header}>
          Single rooms
        </span>
        <div className={styles.search_filter_single_rooms_field}>
          <NumericInputPlusMinus value={this.state.single_rooms} onChange={value => this.setState({single_rooms:value})}/>
        </div>
        <span className={styles.search_filter_double_rooms_header}>
          Double rooms
        </span>
        <div className={styles.search_filter_double_rooms_field}>
          <NumericInputPlusMinus value={this.state.double_rooms} onChange={value => this.setState({double_rooms:value})}/>
        </div>
        <span className={styles.search_filter_preferred_venues_header}>
          Preferred venues only?
        </span>
        <span className={styles.search_filter_preferred_venues_container}>
          <Switch position={this.state.preferred_only} onClick={value => this.setState({preferred_only:value})}/>
        </span>
        <div className={styles.search_filter_separator}/>
        <span className={styles.search_filter_price_header}>Price</span>
        <div className={styles.search_filter_price_range}>
          <InputRange
            maxValue={1752}
            minValue={530}
            formatLabel={value => `$${value}`}
            value={this.state.valuePrice}
            onChange={value => this.setState({ valuePrice: value })}
            onChangeComplete={value => console.log(value)}
          />
        </div>
        <span className={styles.search_filter_postal_code_header}>Postal code</span>
        <input type="text" className={styles.search_filter_postal_code_field} name="postal_code" />
        <input type="checkbox" className={styles.search_filter_leasure_facility_chkbox} />
        <span className={styles.search_filter_leasure_facility_header}>Leasure Facility</span>
        <input type="checkbox" className={styles.search_filter_projector_chkbox} />
        <span className={styles.search_filter_projector_header}>Projector</span>
        <div className={styles.search_filter_separator_2}/>
        <span className={styles.search_filter_rating_header}>Rating</span>
        <div className={styles.search_filter_rating_range}>
          <InputRange
            maxValue={5}
            minValue={2}
            formatLabel={value => `${value}\u2605`}
            value={this.state.valueRating}
            onChange={value => this.setState({ valueRating: value })}
            onChangeComplete={value => console.log(value)}
            />
        </div>
        <span className={styles.search_filter_seating_capacity_header}>Seating capacity</span>
        <div className={styles.search_filter_seating_capacity_range}>
          <InputRange
            maxValue={3500}
            minValue={1}
            formatLabel={value => `${value}`}
            value={this.state.valueSeats}
            onChange={value => this.setState({ valueSeats: value })}
            onChangeComplete={value => console.log(value)}
            />
        </div>
        <span className={styles.search_filter_refresh_button} onClick={this.handleButtonClick}>
          <span className={styles.search_filter_refresh_text}>
            REFRESH
          </span>
        </span>
      </div>
    );
  }



}
export default Search_Filter;
