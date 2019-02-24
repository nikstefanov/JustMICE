import React, { Component } from 'react';
import HotelInfoBox from '../Shortlist/HotelInfoBox';
import styles from '../Style/Search_Results.css';
import ModalDialog from '../Components/ModalDialog';

class Results_List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hotelsList: [],
      modal_state:false,
      modal_text:'',
    }

    this.showModalDialog = this.showModalDialog.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({hotelsList: nextProps.hotelsList});
  }

  render(){
    let current = this;
    return(
    <div>
      <ModalDialog show={this.state.modal_state} text={this.state.modal_text}
        left_button="OK" onLeftButtonClick={()=>this.setState({modal_state:false})}
        />
      {
        this.state.hotelsList.map(function(hotel){
          return(
            <div>
              <HotelInfoBox propertyInfo={hotel} buttonTitle="ADD TO SHORTLIST" modalDialog={current.showModalDialog}/>
            </div>
          );
        })
      }
    </div>
    );
  }

  showModalDialog(message){
    this.setState({modal_state:true, modal_text: message});
  }
}
export default Results_List;
