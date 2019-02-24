import React, { Component } from 'react';
import URL, { URL2 } from './URL';


class SearchResultTable extends React.Component {
  constructor(props) {
    super(props);
    //this.state = props;
    //this.selectVenue = this.selectVenue.bind(this);
  }


  render(){
  var descObj = JSON.parse(this.props.propertyInfo.description);
  var ratingArr = JSON.parse(this.props.propertyInfo.rating);
  var m_roomsObj = JSON.parse(this.props.propertyInfo.meeting_space);
  var thumbUrl = URL2+'/searchresults/image?filename=' + this.props.propertyInfo.thumbnail;

  //console.log(this.props.propertyInfo);


    return(
      <table id={this.props.propertyInfo.id} style={{border: '1 px solid black'}}>
        <tbody>
		    <colgroup>
		    <col style={{padding: '0 px 15 px'}} />
		    <col style={{padding: '0 px 15 px'}} />
		    <col style={{padding: '0 px 15 px'}} />
		    </colgroup>
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
    );
  }

  selectVenue(venueId,event){
    //console.log(venueId);
    event.preventDefault();
    fetch(URL2+"/select"+(this.props.buttonAction=='Remove'?'/remove/':'/')+venueId, {

          credentials: 'include',
          method: 'GET',
        }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
                alert(data.error);
            }else{

            }
          })
  }
}

export default SearchResultTable;
