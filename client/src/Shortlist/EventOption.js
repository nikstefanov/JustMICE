import React from 'react';
import styles from '../Style/Advanced_Event_Options.css';
import NumericInputPlusMinus from '../Components/NumericInputPlusMinus';
import TextField from '../Components/TextField';
import PropTypes from 'prop-types';

class EventOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
      comment: this.props.comment,
    };
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
  }

  onChangeNumber(value){
    if(this.props.onChange){
      this.props.onChange({
        title: this.props.title,
        name: this.props.name,
        number: value,
        comment: this.state.comment,
      });
    }
    this.setState({number: value});
  }

  onChangeComment(value){
    if(this.props.onChange){
      this.props.onChange({
        title: this.props.title,
        name: this.props.name,
        number: this.state.number,
        comment: value,
      });
    }
    this.setState({comment: value});
  }


  render(){
    console.log(this.props  )
    return(
    <div className={styles.event_option_container}>
      <div className={styles.event_option_title}>
        {this.props.title}
      </div>
      <div className={styles.event_option_value}>
        <NumericInputPlusMinus
          disabled={this.props.disabled}
          value={this.state.number} onChange={this.onChangeNumber}/>
      </div>
      <div className={styles.event_option_comment}>
        <TextField className={styles.event_option_comment_field}
          value={this.state.comment} disabled={this.props.disabled} onChange={this.onChangeComment}/>
      </div>
    </div>
    );
  }



}
export default EventOption;

EventOption.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  comment: PropTypes.string,
  onChange: PropTypes.func,
};
