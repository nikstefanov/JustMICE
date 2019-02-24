import React from 'react';
import PropTypes from 'prop-types';


class NumericInputPlusMinus extends React.Component {
  constructor(props) {
    super(props);
    var value = parseInt(this.props.value);
    if(isNaN(value)){value = 0;}
    this.state = {value: value}
  }


  render(){
    const border = {
      //position: 'relative',
      width: '122px',
      height: '34px',
      borderRadius: '4px',
      border: 'solid 1px rgba(0, 0, 0, 0.1)',
      //top:'0px',
      //left:'0px',
    }
  const buttonStyle1 = {
    position: 'absolute',
    top: '6px',
    left: '6px',
    width: '24px',
    height: '24px',
    borderRadius: '2px',
    backgroundColor: '#32b6ff',
    color: '#ffffff',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: '700',
    fontSize: '18px',
    WebkitTouchCallout: 'none', /* iOS Safari */
    WebkitUserSelect: 'none', /* Safari */
    khtmlUserSelect: 'none', /* Konqueror HTML */
    MozUserSelect: 'none', /* Firefox */
    msUserSelect: 'none', /* Internet Explorer/Edge */
    userSelect: 'none', /* Non-prefixed version, currently
                                supported by Chrome and Opera */
    cursor: 'pointer',
  }

  const buttonStyle2 = {
    position: 'absolute',
    top: '6px',
    left: '94px',
    width: '24px',
    height: '24px',
    borderRadius: '2px',
    backgroundColor: '#32b6ff',
    color: '#ffffff',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: '700',
    fontSize: '18px',
    WebkitTouchCallout: 'none', /* iOS Safari */
    WebkitUserSelect: 'none', /* Safari */
    khtmlUserSelect: 'none', /* Konqueror HTML */
    MozUserSelect: 'none', /* Firefox */
    msUserSelect: 'none', /* Internet Explorer/Edge */
    userSelect: 'none', /* Non-prefixed version, currently
                                supported by Chrome and Opera */
    cursor: 'pointer',
  }

  const inputStyle={
    position: 'absolute',
    top: '6px',
    left: '31px',
    width: '62px',
    height: '24px',
    borderWidth:'0px',
    border:'none',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontWtyle: 'normal',
    fontWtretch: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#32b6ff',
  }

  const horizontalLine={
    position: 'relative',
    backgroundColor: '#FFFFFF',
    width: '65%',
    height: '7.5%',
    left: '18%',
    top: '47%',
  }

const verticalLine={
  position: 'relative',
  backgroundColor: '#FFFFFF',
  width: '11%',
  height: '65%',
  left: '43.75%',
  top: '10%',
}
    
    return(
      <div style={border}>
        {!this.props.disabled && <div style={buttonStyle1} onClick={this.removeOne.bind(this)}>
          <div style={horizontalLine} />
        </div> }
        <input type="text" style={inputStyle} disabled={this.props.disabled?"disabled":""} value={this.state.value} onChange={this.inputChange.bind(this)}/>
        {!this.props.disabled && <div style={buttonStyle2} onClick={this.addOne.bind(this)}>
          <div style={horizontalLine} />
          <div style={verticalLine} />
        </div> }
      </div>
    );
  }

  addOne(e){
    e.preventDefault();
    var newValue = parseInt(this.state.value)+1;
    this.setState({value: newValue});
    if(this.props.onChange){this.props.onChange(newValue);}

  }

  removeOne(e){
    e.preventDefault();
    if (parseInt(this.state.value)>0){
      var newValue = parseInt(this.state.value)-1;
      this.setState({value: newValue});
      if(this.props.onChange){this.props.onChange(newValue);}
    }
  }

  inputChange(event){
    event.preventDefault();
    var newValue;
    if(event.target.value.length==0){
      newValue=0;
    }else{
      newValue = parseInt(event.target.value);
    }
    if(!isNaN(newValue) && newValue >= 0){
      this.setState({value: newValue});
      if(this.props.onChange){this.props.onChange(newValue);}
    }
  }

}
  export default NumericInputPlusMinus;

  NumericInputPlusMinus.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
  };
