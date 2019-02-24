import React from 'react';
import styles from '../Style/Advanced_Event_Options.css';
import EventOption from './EventOption';
import EventMeal from './EventMeal';
import Textarea from '../Components/Textarea';
import PropTypes from 'prop-types';

class AdvancedEventOptions extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeMeal = this.onChangeMeal.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.onClickButtonAddMeal = this.onClickButtonAddMeal.bind(this);
    this.onDeleteMeal = this.onDeleteMeal.bind(this);

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

      excycle_food:[],
      excycle_additional_services:'',

      excycle_equipment_expanded:true,
      excycle_food_expanded:true,
      excycle_services_expanded:true,
    };
  }

onChangeField(value){
  //console.log(value);
  this.setState({[value.name]: value});
}

onClickButton(){//save
  var current = this;
  var options = {};
  Object.keys(this.state)
  .filter(key => !key.startsWith('excycle_'))
  .map(function(key){
    var value={
      number: current.state[key].number,
      comment: current.state[key].comment
    }
    //sessionStorage.setItem( current.state[key].name, JSON.stringify(value) );
    options[key] = value;
  });
  //sessionStorage.setItem('additional_services', this.state.additional_services );
  options['food'] = this.state.excycle_food.map(
    (meal)=>{return {meal:meal.meal,time:meal.time,number:meal.number};}
  );
  options['additional_services'] = this.state.excycle_additional_services;
  sessionStorage.setItem('advanced_event_options', JSON.stringify(options) );
  //console.log(JSON.stringify(options));
  if(this.props.onClick){this.props.onClick();}
}
componentWillReceiveProps(){
  var current = this;
  var value =
    (sessionStorage.getItem('advanced_event_options')) ? JSON.parse(sessionStorage.getItem('advanced_event_options')):null;
  console.log(value);
  Object.keys(this.state)
  //.filter(key => key !== 'additional_services')
  .filter(key => !key.startsWith('excycle_'))
  .map(function(key){
    //var value =
      //(sessionStorage.getItem(key))?JSON.parse(sessionStorage.getItem(key)):{number:0,comment:''};
    current.setState({[key]: {
        title: current.state[key].title,
        name: current.state[key].name,
        number: (value && value[key]) ? value[key].number : 0,
        comment: (value && value[key]) ? value[key].comment : '',
    }});
  });
  if(value && value['food']){
    var food_array = value['food'].map(
      (meal,index)=>{return {index:index+1,meal:meal.meal,time:meal.time,number:meal.number};}
    );
    current.setState({excycle_food:food_array});
    //console.log(food_array);
  }else{
    current.setState({excycle_food:[]});
  }
  current.setState({excycle_additional_services:
    (value) ? value['additional_services'] : ''});
}
componentWillMount(){
  var current = this;
  var value =
    (sessionStorage.getItem('advanced_event_options')) ? JSON.parse(sessionStorage.getItem('advanced_event_options')):null;
  console.log(value);
  Object.keys(this.state)
  //.filter(key => key !== 'additional_services')
  .filter(key => !key.startsWith('excycle_'))
  .map(function(key){
    //var value =
      //(sessionStorage.getItem(key))?JSON.parse(sessionStorage.getItem(key)):{number:0,comment:''};
    current.setState({[key]: {
        title: current.state[key].title,
        name: current.state[key].name,
        number: (value && value[key]) ? value[key].number : 0,
        comment: (value && value[key]) ? value[key].comment : '',
    }});
  });
  if(value && value['food']){
    var food_array = value['food'].map(
      (meal,index)=>{return {index:index+1,meal:meal.meal,time:meal.time,number:meal.number};}
    );
    current.setState({excycle_food:food_array});
    //console.log(food_array);
  }else{
    current.setState({excycle_food:[]});
  }
  current.setState({excycle_additional_services:
    (value) ? value['additional_services'] : ''});
}

  onClickButtonAddMeal(){
    var max_index=0;
    for(var i=0;i<this.state.excycle_food.length;i++){
      if(this.state.excycle_food[i].index>max_index){
        max_index = this.state.excycle_food[i].index;
      }
    }
    var food_array = this.state.excycle_food;
    food_array.push({index:max_index+1,meal:'tea',time:'12:00',number:0});
    this.setState({excycle_food: food_array});
    //console.log('add: ' + JSON.stringify(food_array));
  }

  onChangeMeal(new_meal){
    /*
    var food_array = this.state.excycle_food;
    var food_array_new = food_array.filter(meal => meal.index !== new_meal.index);
    food_array_new.push(new_meal);
    this.setState({excycle_food: food_array_new});
    console.log('change: ' + JSON.stringify(food_array_new));
    */
    var arr_index=-1;
    for(var i=0;i<this.state.excycle_food.length;i++){
      if(this.state.excycle_food[i].index == new_meal.index){
        arr_index = i;
        break;
      }
    }
    var food_array = this.state.excycle_food;
    food_array[i] = new_meal;
    this.setState({excycle_food: food_array});
    console.log('change: ' + JSON.stringify(food_array));
  }

  onDeleteMeal(index){/*
    var arr_index=-1;
    for(var i=0;i<this.state.excycle_food.length;i++){
      if(this.state.excycle_food[i].index==index){
        arr_index = this.state.excycle_food[i].index;
        break;
      }
    }
    console.log('index: '+index);
    console.log('arr_index: '+arr_index);
    if(arr_index >= 0){
      var food_array = this.state.excycle_food;
      food_array.splice(arr_index, 1);
      this.setState({excycle_food: food_array});
    }*/

    var food_array = this.state.excycle_food;
    var food_array_new = food_array.filter(meal => meal.index !== index);
    this.setState({excycle_food: food_array_new});
    //console.log(JSON.stringify(food_array));
    //console.log('delete: '+JSON.stringify(food_array_new));

  }

  render(){
    var current = this;
    console.log(current.props.disabled)
    var options = Object.keys(this.state)
//    .filter(key => key !== 'additional_services')
    .filter(key => !key.startsWith('excycle_'))
    .map(function(key){

      return(
        <EventOption
          key={key}
          disabled={current.props.disabled}
          title={current.state[key].title}
          name={current.state[key].name}
          number={current.state[key].number}
          comment={current.state[key].comment}
          onChange={current.onChangeField}
        />
      );
    });
    var meals = this.state.excycle_food.map(
      function(meal){
        return(
          <EventMeal
            disabled={current.props.disabled}
            key={meal.index}
            index={meal.index}
            meal={meal.meal}
            time={meal.time}
            number={meal.number}
            onChange={current.onChangeMeal}
            onDelete={current.onDeleteMeal}
          />
        )
      }
    );
    //console.log('food: ' + JSON.stringify(this.state.excycle_food));

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
                <span
                  className={styles.advanced_event_options_equipment_title_colapse_button}
                  onClick={()=>this.setState({excycle_equipment_expanded: !this.state.excycle_equipment_expanded})}
                  >
                    <img src="/images/design/white_arrow.png"/>
                </span>
              </div>
              {this.state.excycle_equipment_expanded &&
                <div>
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
              }
            </div>

            <div className={styles.advanced_event_options_equipment}>
              <div className={styles.advanced_event_options_equipment_title}>
                Food and Beverage
                <span
                  className={styles.advanced_event_options_equipment_title_colapse_button}
                  onClick={()=>this.setState({excycle_food_expanded: !this.state.excycle_food_expanded})}
                  >
                    <img src="/images/design/white_arrow.png"/>
                </span>
              </div>
              {this.state.excycle_food_expanded &&
                <div className={styles.advanced_event_options_food_botom}>
                  <div className={styles.event_option_container}>
                    <div className={styles.advanced_event_options_equipment_title_requirements}>
                      Meal
                    </div>
                    <div className={styles.advanced_event_options_equipment_title_number}>
                      Serve Time
                    </div>
                    <div className={styles.advanced_event_options_equipment_title_comments}>
                      Number
                    </div>
                  </div>
                  {meals}
                  {!current.props.disabled &&
                  <div className={styles.advanced_event_options_add_meal_button} style={{visibility: this.props.disabled?"hidden":""}} onClick={this.onClickButtonAddMeal}>
                    Add Meal
                  </div>}
                </div>
              }
            </div>

            <div className={styles.advanced_event_options_equipment}>
              <div className={styles.advanced_event_options_equipment_title}>
                Additional services
                <span
                  className={styles.advanced_event_options_equipment_title_colapse_button}
                  onClick={()=>this.setState({excycle_services_expanded: !this.state.excycle_services_expanded})}
                  >
                    <img src="/images/design/white_arrow.png"/>
                </span>
              </div>
              {this.state.excycle_services_expanded &&
                <Textarea
                  disabled={this.props.disabled}
                  value={this.state.excycle_additional_services}
                  className={styles.advanced_event_options_additional_services_textarea}
                  onChange={value => this.setState({excycle_additional_services: value})}/>
              }
            </div>

            <div className={styles.advanced_event_options_save_button} onClick={this.onClickButton}>
              {this.props.disabled?"CLOSE":"SAVE"}
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
