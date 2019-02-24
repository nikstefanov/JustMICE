import React, { Component } from 'react';
import URL, { URL2 } from '../URL';
import styles from '../Style/Shortlist.css';


class HotelInfoBox extends React.Component {
  constructor(props) {
    super(props);
    //this.state = props;
    //this.selectVenue = this.selectVenue.bind(this);

  }


  render(){
    var descObj = JSON.parse(this.props.propertyInfo.description);
    var ratingArr = JSON.parse(this.props.propertyInfo.rating);
    var m_roomsObj = JSON.parse(this.props.propertyInfo.meeting_space);
    //var thumbUrl = URL2+'/searchresults/image?filename=' + this.props.propertyInfo.thumbnail;
    var thumbUrl = '/images/' + this.props.propertyInfo.thumbnail;
    var descObj = JSON.parse(this.props.propertyInfo.description);
    var ratingArr = JSON.parse(this.props.propertyInfo.rating);
    var rating = "";
    if(ratingArr.length>0){
      for(var j=0;j<ratingArr[0].grade;j++){
        rating+="\u2605";
      }
    }

  //console.log(this.props.propertyInfo);

/*
      <table id={this.props.propertyInfo.id} style={{border: '1 px solid black'}}>
        <tbody>
		    <tr>
            <td rowspan='4'><img src={thumbUrl}/></td>
            <td colspan='4' style={{fontWeight: 'bold'}}>{this.props.propertyInfo.name}</td>
        </tr>
		    <tr>
            <td>{descObj.description}</td>
            <td>Brand: {this.props.propertyInfo.brand}</td>
            <td>Guest rooms: {descObj.guest_rooms}</td>
            <td/>
        </tr>
		    <tr>
            <td>Build: {descObj.build}</td>
            <td>Chain: {this.props.propertyInfo.chain}</td>
            <td>Meeting rooms: {m_roomsObj.meeting_rooms}</td>
            <td/>
        </tr>
		    <tr>
            <td>Renovated: {descObj.renovated}</td>
            <td>Rating: {ratingArr[0].name} {ratingArr[0].grade}</td>
            <td>Meeting space: {descObj.total_meeting_space} sq.{descObj.unit}.</td>
            <td>
            {this.props.button &&
              <button onClick={this.selectVenue.bind(this, this.props.propertyInfo.id)}>{this.props.buttonAction}</button>
            }
            </td>
        </tr>
        </tbody>
      </table>
      <img src={thumbUrl} className={styles.hotel_info_box_image} />




*/

    return(
      <div className={styles.hotel_info_box_container}
        onClick={this.visitHotelPage.bind(this, this.props.propertyInfo.id)}>
        <div className={styles.hotel_info_box_image_container}>
          <img src={thumbUrl} className={styles.hotel_info_box_image} />
        </div>
        <span className={styles.hotel_info_box_info_container}>
          <span className={styles.hotel_info_box_info_title}>
            {this.props.propertyInfo.name.substring(0, 50)}
          </span>
          <span className={styles.hotel_info_box_info_rating}>
            {rating}
          </span>
          {String.fromCharCode(this.props.propertyInfo.preferred.data[0]) === '1' &&
            <span className={styles.hotel_info_box_info_preferred}>
              Preferred Venue
            </span>
          }
          <span className={styles.hotel_info_box_info_description}>
            {descObj.description.substring(0, 50)}
          </span>
          <span className={styles.hotel_info_box_info_gest_rooms}>
            {'Guest rooms: '+descObj.guest_rooms}
          </span>
          <span className={styles.hotel_info_box_info_meeting_rooms}>
            {'Meeting rooms: ' + (m_roomsObj['Meeting Rooms'] ? m_roomsObj['Meeting Rooms'] : "N/A")}
          </span>
          <span className={styles.hotel_info_box_info_meeting_space}>
            {'Total meeting space: ' + descObj.total_meeting_space+' sq.'+descObj.unit}
          </span>
          <span className={styles.hotel_info_box_info_largest_room}>
            {'Largest Room: ' + (m_roomsObj['Largest Room'] ? m_roomsObj['Largest Room'] : "N/A")}
          </span>
        </span>
        <span
          className={this.props.buttonTitle=='REMOVE'?
            styles.hotel_info_box_reomove_button:
            styles.hotel_info_box_add_button}
            onClick={this.selectVenue.bind(this, this.props.propertyInfo.id)}>
          <span
            className={this.props.buttonTitle=='REMOVE'?
              styles.hotel_info_box_remove_button_text:
              styles.hotel_info_box_add_button_text}>
            {this.props.buttonTitle}
          </span>
        </span>
      </div>

















    );
  }

  selectVenue(venueId,event){
    let current = this;
    //console.log(venueId);
    //console.log('selectVenues');
    event.stopPropagation();
    event.preventDefault();
    fetch(URL2+"/select"+(this.props.buttonTitle=='REMOVE'?'/remove/':'/')+venueId, {
          credentials: 'include',
          method: 'GET',
        }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
                //alert(data.error);
                if(current.props.modalDialog){
                  current.props.modalDialog(data.error);
                }
            }else{
                if(current.props.buttonTitle!=='REMOVE'){
                  if(current.props.modalDialog){
                    current.props.modalDialog("Venue added to shortlist.");
                  }
                  //alert("Venue added to shortlist.");
                }
            }
          })
    if(this.props.handleButtonClick){
      this.props.handleButtonClick(venueId,event)
    }
  }

  visitHotelPage(venueId,event){
    //console.log('visitHotelPage');
    event.preventDefault();
    window.location = `/view/venue/${venueId}`;
  }



}

export default HotelInfoBox;
