import styles from '../Style/Components.css';
import React,{Component} from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(event){
    this.setState({value: event.target.value});
    if(this.props.onChange){this.props.onChange(event.target.value);}
  }

  render(){
    return(
      <input type="text"
        disabled={this.props.disabled?"disabled":""}
        placeholder={this.props.placeholder}
        value={this.state.value}
        className={this.props.className}
        onChange={this.onChangeField}
      />
    );
  }

}
export default TextField;

TextField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
};
