import React from 'react';
import PropTypes from 'prop-types';


class Textarea extends React.Component {
  constructor(props) {
    super(props);
    var value = '';
    if(this.props.value && typeof this.props.value === 'string'){value = this.props.value;}
    this.state = {value: value};
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    this.setState({value: event.target.value});
    if(this.props.onChange){this.props.onChange(event.target.value);}
  }

  render(){
    return(
        <textarea
          disabled={this.props.disabled?"disabled":""}
          placeholder={this.props.placeholder}
          value={this.state.value}
          className={this.props.className}
          onChange={this.onChange}
        />
      );
  }


}


export default Textarea;

Textarea.propTypes = {
  value: PropTypes.string,
  className: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
