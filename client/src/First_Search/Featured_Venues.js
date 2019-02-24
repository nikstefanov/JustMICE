import React from 'react';
import styles from '../Style/Style.css';
import URL, { URL2 } from '../URL';
import ModalDialog from '../Components/ModalDialog';

class Featured_Venues extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      modal_state:false,
      modal_text:'',
      featHotels:[]
    };
  }

  componentWillMount(){
      let current = this;
          fetch(URL2+"/searchresults/featured", {
    		    credentials: 'include',
    		    method: 'GET'
    		    }).then((resp1) => resp1.json())
    		    .then(function(data1) {
              //console.log("------------------------");
    		      if(data1.error){
    			         //current.setState({companyOptions: ''});
                   //console.log(data1.error);
    		      }else{
                //console.log(data1);
    			      current.setState({featHotels: data1});
                //console.log(current.state.featHotels);
    		      }
    		      })
  }

  render(){
    //console.log(this.state.featHotels);
    const listItems = this.state.featHotels.map((hotel_info,index) =>
      <div key={index} className={styles.featured_hotel_container}>
        <img src={URL2+'/searchresults/image?filename='+hotel_info.thumbnail}
          className={styles.faetured_hotel_thumbnail} />
      </div>
    );


    var list = [];
    var className1;
    var descObj;
    var ratingArr;
    var rating;
    for (var i = 0; i < this.state.featHotels.length; i++ ){
      //console.log(this.state.featHotels[i]);
      descObj = JSON.parse(this.state.featHotels[i].description);
      ratingArr = JSON.parse(this.state.featHotels[i].rating);
      switch(i){
        case 0: className1 = styles.featured_hotel_container_0;break;
        case 1: className1 = styles.featured_hotel_container_1;break;
        case 2: className1 = styles.featured_hotel_container_2;break;
      }
      rating = "";
      if(ratingArr.length > 0){
        for(var j=0;j<ratingArr[0].grade;j++){
          rating+="\u2605";
        }
      }//else{rating+="\u2605\u2605\u2605\u2605";}
      list.push(
        <div key={i} className={className1}>
          <div className={styles.featured_hotel_image_container}>
            <img src={'/images/'+this.state.featHotels[i].thumbnail}
              className={styles.featured_hotel_image} />
          </div>
          <span className={styles.featured_hotel_name}>{this.state.featHotels[i].name.substring(0, 45)}</span>
          <span className={styles.featured_hotel_description}>{descObj.description.substring(0, 15)}</span>
          <span className={styles.featured_hotel_rating}>{rating}</span>
          <span className={styles.featured_hotel_shortlist}
            onClick={this.selectVenue.bind(this, this.state.featHotels[i].id)}>
            Add to Shortlist
          </span>
        </div>
      );
    }
//console.log(list);

    return(
      <div className={styles.featured_vanues_container}>
        <ModalDialog show={this.state.modal_state} text={this.state.modal_text}
          left_button="OK" onLeftButtonClick={()=>this.setState({modal_state:false})}
          />
        <span className={styles.featured_hotel_title}>Featured venues</span>
        {list}
      </div>
    );
  }

  selectVenue(venueId,event){
    //console.log(venueId);
    let current = this;
    event.preventDefault();
    fetch(`${URL2}/select/${venueId}`, {

          credentials: 'include',
          method: 'GET',
        }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
                //alert(data.error);
                current.setState({modal_state:true, modal_text: data.error});
            }else{
                //alert("Venue added to shortlist.");
                current.setState({modal_state:true, modal_text: "Venue added to shortlist."});
            }
          })
  }


}
export default Featured_Venues;
