import React from 'react';
import styles from '../Style/Shortlist.css';
import EventOption from '../Shortlist/EventOption';
import Textarea from '../Components/Textarea';
import PropTypes from 'prop-types';

class AdvancedEventOptions extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.state = {
      writing_pads:{title:'Writing pads and pens',name:'writing_pads',number:0,comment:''},
      flip_chart:{title:'Flip chart',name:'flip_chart',number:0,comment:''},
      overhead_projector:{title:'Overhead projector',name:'overhead_projector',number:0,comment:''},
      screen:{title:'Screen',name:'screen',number:0,comment:''},
      pinboard:{title:'Pinboard',name:'pinboard',number:0,comment:''},
      whiteboard:{title:'Whiteboard',name:'whiteboard',number:0,comment:''},
      copy_machine:{title:'Copy machine',name:'copy_machine',number:0,comment:''},
      slide_projector:{title:'Slide projector',name:'slide_projector',number:0,comment:''},
      video_projector:{title:'Video projector',name:'video_projector',number:0,comment:''},
      presenters_kit:{title:"Presenter's kit",name:'presenters_kit',number:0,comment:''},
      internet_connection:{title:'Internet connection',name:'internet_connection',number:0,comment:''},
      wireless_lan:{title:'Wireless LAN',name:'wireless_lan',number:0,comment:''},
      tv_dvd:{title:'TV + Video/DVD',name:'tv_dvd',number:0,comment:''},
      microphone:{title:'Microphone',name:'microphone',number:0,comment:''},
      clip_microphone:{title:'Clip Microphone',name:'clip_microphone',number:0,comment:''},
      wireless_microphone:{title:'Wireless microphone',name:'wireless_microphone',number:0,comment:''},
      sound_system:{title:'Sound system',name:'sound_system',number:0,comment:''},
      lectern:{title:'Lectern',name:'lectern',number:0,comment:''},
      stage:{title:'Stage',name:'stage',number:0,comment:''},
      podium:{title:'Podium',name:'podium',number:0,comment:''},
      loudspeacers:{title:'Loudspeakers for notebooks',name:'loudspeacers',number:0,comment:''},
      booth:{title:"Interpreter's booth",name:'booth',number:0,comment:''},
      notebook:{title:'Notebook',name:'notebook',number:0,comment:''},
      additional_services:'',
    };
  }

onChangeField(value){
  //console.log(value);
  this.setState({[value.name]: value});
}

onClickButton(){
  var current = this;
  var options = {};
  Object.keys(this.state)
  .filter(key => key !== 'additional_services')
  .map(function(key){
    var value={
      number: current.state[key].number,
      comment: current.state[key].comment
    }
    //sessionStorage.setItem( current.state[key].name, JSON.stringify(value) );
    options[key] = value;
  });
  //sessionStorage.setItem('additional_services', this.state.additional_services );
  options['additional_services'] = this.state.additional_services;
  sessionStorage.setItem('advanced_event_options', JSON.stringify(options) );
  if(this.props.onClick){this.props.onClick();}
}

componentWillMount(){
  var current = this;
  var value =
    (sessionStorage.getItem('advanced_event_options')) ? JSON.parse(sessionStorage.getItem('advanced_event_options')):null;
  //console.log(value);
  Object.keys(this.state)
  .filter(key => key !== 'additional_services')
  .map(function(key){
    //var value =
      //(sessionStorage.getItem(key))?JSON.parse(sessionStorage.getItem(key)):{number:0,comment:''};
    current.setState({[key]: {
        title: current.state[key].title,
        name: current.state[key].name,
        number: (value) ? value[key].number : 0,
        comment: (value) ? value[key].comment : '',
    }});
  });
  current.setState({additional_services:
    (value) ? value['additional_services'] : ''});
}


  render(){
    var current = this;
    var options = Object.keys(this.state)
    .filter(key => key !== 'additional_services')
    .map(function(key){
      return(
        <EventOption
          title={current.state[key].title}
          name={current.state[key].name}
          number={current.state[key].number}
          comment={current.state[key].comment}
          onChange={current.onChangeField}
        />
      );
    });
    if(this.props.show){
      return(
        <div className={styles.advanced_event_options_background}>
          <div className={styles.advanced_event_options_content}>
            <div className={styles.advanced_event_options_title}>
              Advanced event options
            </div>
            <div className={styles.advanced_event_options_equipment}>
              <div className={styles.advanced_event_options_equipment_title}>
                Additional conference equipment (for all conference rooms)
              </div>
              <div className={styles.event_option_container}>
                <div className={styles.advanced_event_options_equipment_title_requirements}>
                  Requirements
                </div>
                <div className={styles.advanced_event_options_equipment_title_number}>
                  Number
                </div>
                <div className={styles.advanced_event_options_equipment_title_comments}>
                  Comments
                </div>
              </div>
              {options}
            </div>
            <div className={styles.advanced_event_options_additional_services}>
              <div className={styles.advanced_event_options_additional_services_title}>
                Additional services
              </div>
              <Textarea
                value={this.state.additional_services}
                className={styles.advanced_event_options_additional_services_textarea}
                onChange={value => this.setState({additional_services: value})}/>
            </div>
            <div className={styles.advanced_event_options_save_button} onClick={this.onClickButton}>
              SAVE
            </div>
          </div>
        </div>
      );
    }else{
      return(null);
    }
  }
/*


*/

}
export default AdvancedEventOptions;

AdvancedEventOptions.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
};
