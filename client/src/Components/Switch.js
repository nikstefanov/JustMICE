import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    var position=this.props.position;
    if(typeof position == 'undefined'){position=false;}
    this.state={pos: position};
  }

  componentWillReceiveProps(nextProps){
    this.setState({pos: nextProps.position});
  }




  render(){
    //this.state.pos = this.props.position
    const container = {
      position: 'relative',
      width:'54px',
      //height:'30px',
    };

    const slider_0 = {
      position: 'absolute',
      top: '7px',
      left: '0px',
      width: '54px',
      height: '17px',
      borderRadius: '32px',
      backgroundColor: '#e1e1e1',
    };

    const slider_1 = {
      position: 'absolute',
      top: '7px',
      left: '0px',
      width: '54px',
      height: '17px',
      borderRadius: '32px',
      backgroundColor: 'rgba(50, 182, 255, 0.5)',
    };

    const button_0 = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '30px',
      height: '30px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
      borderRadius: '32px',
      cursor: 'pointer',
    };

    const button_1 = {
      position: 'absolute',
      top: '0px',
      left: '24px',
      width: '30px',
      height: '30px',
      backgroundColor: '#32b6ff',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
      borderRadius: '32px',
      cursor: 'pointer',
    };


    return(
      <div style={container}>
      &nbsp;&nbsp;
        <div style={this.state.pos?
          (slider_1):
          (slider_0)} />
        <div style={this.state.pos?
          (button_1):
          (button_0)}
          onClick={this.changePosition.bind(this)}/>
      </div>
    );
  }

  changePosition(event){
    event.preventDefault();
    if(this.props.disabled==undefined || !this.props.disabled){
      if(this.props.onClick){this.props.onClick(!this.state.pos);}
      this.setState({pos: !this.state.pos});
    }
  }


}
export default Switch;

Switch.propTypes = {
  position: PropTypes.bool,
  //className: PropTypes.object,
  onChange: PropTypes.func,
};
