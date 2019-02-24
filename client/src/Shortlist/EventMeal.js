import React from 'react';
import styles from '../Style/Advanced_Event_Options.css';
import NumericInputPlusMinus from '../Components/NumericInputPlusMinus';
import TextField from '../Components/TextField';
import Select from 'react-select';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

class EventMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //index: this.props.index,
      meal: (this.props.meal)?this.props.meal:'tea',
      time: (this.props.time)?this.props.time:"00:00",
      number: this.props.number?this.props.number:0,

    };
    this.onChangeMeal = this.onChangeMeal.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }


/*
componentWillReceiveProps(nextProps){
  this.setState({
    meal: nextProps.meal,
    time: nextProps.time,
    number: nextProps.number
  })
}*/

componentDidMount(){
  /*
  var time_input_el = document.getElementsByClassName('rc-time-picker-input')[0];
  time_input_el.style = "color: #32b6ff;"
  console.log('style: '+time_input_el);
*/
}

  onChangeMeal(value){
    if(value===null){value = 'tea';}
    if(this.props.onChange){
      this.props.onChange({
        index: this.props.index,
        meal: value,
        time: this.state.time,
        number: this.state.number,
      });
    }
    this.setState({meal: value});
  }

  onChangeNumber(value){
    if(this.props.onChange){
      this.props.onChange({
        index: this.props.index,
        meal: this.state.meal,
        time: this.state.time,
        number: value,
      });
    }
    this.setState({number: value});
  }

  onChangeTime(value){
    if(this.props.onChange){
      this.props.onChange({
        index: this.props.index,
        meal: this.state.meal,
        time: value.format('HH:mm'),
        number: this.state.number,
      });
    }
    this.setState({time: value.format('HH:mm')});
  }

  onChangeTimeTest(value) {
    console.log(value && value.format('HH:mm:ss'));
  }

  onDelete(){
    if(this.props.onDelete){
      this.props.onDelete(this.props.index);
    }
  }

  render(){
    var current = this
    return(
    <div className={styles.event_meal_container}>
      <div className={styles.event_meal_title}>

        <Select
          clearable={false}
          options={[
            { value: 'tea', label: 'Tea/Coffee' },
            { value: 'lunch', label: 'Lunch' },
            { value: 'dinner', label: 'Dinner' },
          ]}
          disabled={current.props.disabled}
          value={this.state.meal}
          onChange={this.onChangeMeal}
          style={{color:'#32b6ff'}}
          simpleValue={true}
        />
      </div>
      <div className={styles.event_meal_value}>
        <TimePicker
          disabled={current.props.disabled}
          defaultValue={moment(this.state.time, "HH:mm")}
          allowEmpty={false}
          showSecond={false}
          className="advanced_event_options_event_meal_time"
          onChange={this.onChangeTime}
          style={{color:'#32b6ff'}}
        />
      </div>
      <div className={styles.event_meal_comment}>
        <NumericInputPlusMinus
        disabled={current.props.disabled}
          value={this.state.number}
          onChange={this.onChangeNumber}/>
      </div>
      {!current.props.disabled &&
      <button className={styles.event_meal_delete_button} onClick={this.onDelete}>
        <img src="/images/design/trash.png" className={styles.event_meal_trash_icon}/>
      </button>}
    </div>
    );
  }



}
export default EventMeal;

EventMeal.propTypes = {
  index: PropTypes.number.isRequired,
  meal: PropTypes.string,
  number: PropTypes.number,
  time: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};
