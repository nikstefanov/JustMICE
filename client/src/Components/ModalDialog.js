import React, { Component } from 'react';
//import URL, { URL2 } from '../URL';
import styles from '../Style/ModalDialog.css';

class ModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show:this.props.show, text: this.props.text,
    };
  }



componentWillReceiveProps(nextProps){
  this.setState({show: nextProps.show, text: nextProps.text});
}



  render(){
    if(this.state.show){
      return(
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <div className={styles.modal_text}>
              {this.state.text}
            </div>
            <div className={styles.modal_buttons}>
              <span className={styles.left_button} onClick={this.leftButtonClick.bind(this)}>
                {this.props.left_button}
              </span>
              <span className={styles.right_button} onClick={this.rightButtonClick.bind(this)}>
                {this.props.right_button}
              </span>
            </div>
          </div>
        </div>
      );
    }else{return null;}
  }

  leftButtonClick(){
    if(this.props.onLeftButtonClick)this.props.onLeftButtonClick();
  }

  rightButtonClick(){
    if(this.props.onRightButtonClick)this.props.onRightButtonClick();
  }

}

export default ModalDialog;
