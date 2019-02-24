import React from 'react';


class NumericInputPlusMinus extends React.Component {
  constructor(props) {
    super(props);
    var value = parseInt(this.props.value);
    if(isNaN(value)){value = 0;}
    this.state = {value: value}
  }


  render(){
    const border = {
  width: '122px',
  height: '34px',
  borderRadius: '4px',
  border: 'solid 1px rgba(0, 0, 0, 0.1)'
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
    color: '#354052',
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
        <div style={buttonStyle1} onClick={this.removeOne.bind(this)}>
          <div style={horizontalLine} />
        </div>
        <input type="text" style={inputStyle} value={this.state.value}/>
        <div style={buttonStyle2} onClick={this.addOne.bind(this)}>
          <div style={horizontalLine} />
          <div style={verticalLine} />
        </div>
      </div>
    );
  }

  addOne(e){
    e.preventDefault();
    this.setState({value: parseInt(this.state.value)+1});
  }

  removeOne(e){
    e.preventDefault();
    if (parseInt(this.state.value)>0){
      this.setState({value: parseInt(this.state.value)-1});
    }
  }
}
  export default NumericInputPlusMinus;
