import React, { Component } from 'react';
import { Row,Grid,Col } from 'react-bootstrap';
import Navigation from '../First_Search/Navigation';
import Head from '../Components/Head';
import Foot from '../Components/Foot';
import styles from '../Style/Search_Results.css';
import Search_Filter from './Search_Filter';
import Results_List from './Results_List';
import HotelInfoBox from '../Shortlist/HotelInfoBox';
import URL, { URL2 } from '../URL';
import GMap from '../Components/GMap';
import moment from 'moment';
import ModalDialog from '../Components/ModalDialog';

class Search_Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*first_search: JSON.parse(sessionStorage.getItem('first_search')),*/
      location: (sessionStorage.getItem('location'))?sessionStorage.getItem('location'):'',
      attendees: (sessionStorage.getItem('attendees'))?sessionStorage.getItem('attendees'):0,
      event_rooms: (sessionStorage.getItem('event_rooms'))?sessionStorage.getItem('event_rooms'):0,
      start_date: (sessionStorage.getItem('start_date'))?moment(sessionStorage.getItem('start_date')):moment(),
      end_date: (sessionStorage.getItem('end_date'))?moment(sessionStorage.getItem('end_date')):moment(),
      single_rooms: (sessionStorage.getItem('single_rooms'))?sessionStorage.getItem('single_rooms'):0,
      double_rooms: (sessionStorage.getItem('double_rooms'))?sessionStorage.getItem('double_rooms'):0,
      superior_rooms: (sessionStorage.getItem('superior_rooms'))?sessionStorage.getItem('superior_rooms'):0,
      preferred_only: (sessionStorage.getItem('preferred_only')==='true')?true:false,
      value_rating: (sessionStorage.getItem('value_rating'))
                    ? JSON.parse(sessionStorage.getItem('value_rating'))
                    :{min: 2, max: 5,},
      value_seats: (sessionStorage.getItem('value_seats'))
                    ? JSON.parse(sessionStorage.getItem('value_seats'))
                    :{min: 1, max: 3500,},

      currentPageNumber: 0,
      hotelsPerPage: 10,
      hotelsList: [],
      hotelsCount: 0,
      map: (<span></span>),

      modal_state:false,
      modal_text:'',
    };
    this.getHotels = this.getHotels.bind(this);
    this.getHotelsCount = this.getHotelsCount.bind(this);
    this.newSearch = this.newSearch.bind(this);

    console.log("preferred_only: " + sessionStorage.getItem('preferred_only'));
  }

  componentWillMount(){
    fetch(URL2+"/user/getinfo", {
          credentials: 'include',
          method: 'GET',
          headers : new Headers(),
          }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
              document.location="/"
            }else{
              if(data.userroles_id != 3){
                document.location="/"
              }
            }
            })
    this.getHotelsCount();
    this.getHotels(this.state.currentPageNumber);
  }

  getHotelsCount(){
    let current = this;
    fetch(URL2+"/searchresults/new_count",{
    credentials: 'include',
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body: JSON.stringify({
      location: this.state.location,
      attendees: this.state.attendees,
      event_rooms: this.state.event_rooms,
      single_rooms: this.state.single_rooms,
      double_rooms: this.state.double_rooms,
      superior_rooms: this.state.superior_rooms,
      preferred_only: this.state.preferred_only,
      value_rating: this.state.value_rating,
      value_seats: this.state.value_seats,
    })
      }).then((resp) => resp.json()).then(function(data){
        if(data.error){
          current.setState({hotelsCount: 0});
        }else{
          current.setState({hotelsCount: parseInt(data[0].TotalRecords)});
          console.log('Total records: '+data[0].TotalRecords);
        }
      })
  }

  getHotels(pageNumber){
    let current = this;
    fetch(URL2+"/searchresults/new",{
    credentials: 'include',
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body: JSON.stringify({
      location: this.state.location,
      attendees: this.state.attendees,
      event_rooms: this.state.event_rooms,
      single_rooms: this.state.single_rooms,
      double_rooms: this.state.double_rooms,
      superior_rooms: this.state.superior_rooms,
      preferred_only: this.state.preferred_only,
      value_rating: this.state.value_rating,
      value_seats: this.state.value_seats,
      pageNumber: pageNumber,
      hotelsPerPage: this.state.hotelsPerPage,
    })
      }).then((resp) => resp.json()).then(function(data){
        if(data.error){
          current.setState({hotelsList: []});
        }else{
          current.setState({hotelsList: data});
          var coords = []
          for(var i=0;i<current.state.hotelsList.length;i++){
            //constructing string of stars
            var ratingArr = JSON.parse(current.state.hotelsList[i].rating);
            var rating = "";
            if(ratingArr.length>0){
              for(var j=0;j<ratingArr[0].grade;j++){
                rating+="\u2605";
              }
            }

            coords.push({name: current.state.hotelsList[i].name, lat: current.state.hotelsList[i].latitude, lng: current.state.hotelsList[i].longitude, city: current.state.hotelsList[i].city,
              stars: rating, thumbnail: current.state.hotelsList[i].thumbnail});
          }
          //console.log(current.state.hotelsList);
          //console.log(coords);
          console.log(current.state.map)
          current.setState({map: <GMap coordinates={coords}/>},()=>{current.render();})
          console.log(current.state.map)
          current.render();
        }
      })
  }

  newSearch(criteria, event){
    console.log('newSearch');
    this.setState({
      location: criteria.location,
      attendees: criteria.attendees,
      event_rooms: criteria.event_rooms,
      start_date: criteria.start_date,
      end_date: criteria.end_date,
      single_rooms: criteria.single_rooms,
      double_rooms: criteria.double_rooms,
      preferred_only: criteria.preferred_only,
      value_rating: criteria.value_rating,
      value_seats: criteria.value_seats,
      currentPageNumber: 0,
    }, function(){
        this.getHotelsCount();
        this.getHotels(this.state.currentPageNumber);
        //sessionStorage.setItem('first_search', JSON.stringify(this.state.first_search));
        sessionStorage.setItem('location', this.state.location);
        sessionStorage.setItem('attendees', this.state.attendees);
        sessionStorage.setItem('event_rooms', this.state.event_rooms);
        sessionStorage.setItem('start_date', this.state.start_date);
        sessionStorage.setItem('end_date', this.state.end_date);
        sessionStorage.setItem('single_rooms', this.state.single_rooms);
        sessionStorage.setItem('double_rooms', this.state.double_rooms);
        sessionStorage.setItem('preferred_only', this.state.preferred_only);
        sessionStorage.setItem('value_rating', JSON.stringify(this.state.value_rating));
        sessionStorage.setItem('value_seats', JSON.stringify(this.state.value_seats));
      });
  }

    render(){
      /*
      console.log(JSON.parse(sessionStorage.getItem('first_search')));
      var hotelBoxList = [];
      for (var i = 0; i < this.state.search_results.length; i++ ){
        hotelBoxList.push(
          <div>
            <HotelInfoBox propertyInfo={this.state.search_results[i]} buttonTitle="ADD TO SHORTLIST" />
          </div>
        );
      }*/

      return(
        <div >
          <ModalDialog show={this.state.modal_state} text={this.state.modal_text}
            left_button="OK" onLeftButtonClick={()=>this.setState({modal_state:false})}
            />
          <Head />
          <Grid className={styles.grid}>
            <Row>
              <Col lg={12}>
                <div className={styles.search_results_map}>
                  {this.state.map}
                </div>
              </Col>
            </Row>
            <div className={styles.filter_and_results_container}>
              <Row>
                <Col lg={10}>
                  <div className={styles.search_results_total_container}>
                    <div className={styles.search_results_total_text}>
                      {`Found ${this.state.hotelsCount} venues that matched your query.`}
                    </div>
                  </div>
                </Col>
                <Col lg={2}></Col>
              </Row>
              <Row>
                <Col mdHidden smHidden xsHidden lg={12}>
                  <div className={styles.navigation}>
                    <Navigation />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} lg={5}>
                  <Search_Filter
                      location={this.state.location}
                      attendees={this.state.attendees}
                      event_rooms={this.state.event_rooms}
                      start_date={this.state.start_date}
                      end_date={this.state.end_date}
                      single_rooms={this.state.single_rooms}
                      double_rooms={this.state.double_rooms}
                      value_rating={this.state.value_rating}
                      value_seats={this.state.value_seats}
                      preferred_only={this.state.preferred_only}
                      onNewSearch={this.newSearch.bind(this)}/>
                </Col>
                <Col md={12} lg={7}>
                  <div>
                    <Results_List hotelsList={this.state.hotelsList}/>
                  </div>
                  <div className={styles.results_list_page_navigation_container}>
                    <span className={styles.results_list_previous_page} onClick={this.goPreviousPage.bind(this)}>{'<<'}</span>
                    <span className={styles.results_list_page_counter}>
                      {(this.state.currentPageNumber+1)+' / ' +Math.ceil(this.state.hotelsCount/this.state.hotelsPerPage)}
                    </span>
                    <span className={styles.results_list_next_page} onClick={this.goNextPage.bind(this)}>{'>>'}</span>
                  </div>
                </Col>

              </Row>
            </div>
          </Grid>
          <Foot/>
        </div>

      );
    }
/*
<div className={styles.shortlist_buttons}>
  <span className={styles.reset_shortlist_button}>
    <span className={styles.reset_shortlist_button_text}>
      RESET SHORTLIST
    </span>
  </span>
  <span className={styles.review_rfp_button}>
    <span className={styles.review_rfp_button_text}>
      REVIEW RFP
    </span>
  </span>
</div>


<Col mdHidden smHidden xsHidden lg={2}/>
<Col mdHidden smHidden xsHidden lg={3}/>
<Col lg={2}></Col>
*/

  goPreviousPage(event){
    var curPage = this.state.currentPageNumber;
    if(curPage>0){
      this.getHotels(curPage-1);
      this.setState({currentPageNumber: curPage-1});
    }
  }

  goNextPage(event){
    var curPage = this.state.currentPageNumber;
    //console.log(this.state.currentPageNumber);
    //console.log(this.state.hotelsCount);
    //console.log(this.props.hotelsCount);
    //console.log(this.state.hotelsPerPage);
    if ((this.state.hotelsCount - curPage * this.state.hotelsPerPage) > this.state.hotelsPerPage){
      this.getHotels(curPage+1);
      this.setState({currentPageNumber: curPage+1});
    }
  }

}

export default Search_Results;
