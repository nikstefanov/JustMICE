import React from 'react';
import NumericInput from 'react-numeric-input';

class NumericInputPlusMinus2 extends React.Component {
  constructor(props) {
    super(props);
  }


        render(){
const count_input={
  position: 'relative',
  width: '100%',
  maxWidth: '165px',
  margin: '10px 0',
};
const quantity={
  width: '100%',
  height: '36.92307692px',
  border: '1px solid #000',
  borderRadius: '2px',
  background: 'none',
  textAlign: 'center',
};
const incr_btn={
  display: 'block',
  position: 'absolute',
  width: '30px',
  height: '30px',
  fontSize: '26px',
  fontWeight: '300',
  textAlign: 'center',
  lineHeight: '30px',
  top: '50%',
  right: '0',
  marginTop: '-15px',
  textDecoration:'none',
};


    return(
      <div>
	     <div style={count_input}>
          <a style={incr_btn} data-action="decrease" >–</a>
          <input style={quantity} type="text" name="quantity" value="1"/>
          <a style={incr_btn} data-action="increase" >+</a>
      </div>
    </div>


    );

  }
}
export default NumericInputPlusMinus2;
