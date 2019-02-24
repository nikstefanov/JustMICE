import React from 'react';
//import Navigation from '../Components/Navigation';
import Navigation from './Navigation';
import styles from '../Style/Style.css';
import Head from '../Components/Head';
import Foot from '../Components/Foot';
import Event_Details from './Event_Details';
import Featured_Venues from './Featured_Venues';
import { Row,Grid,Col } from 'react-bootstrap';
import GMap from '../Components/GMap';
import URL, { URL2 } from '../URL';
//import { Row,Grid,Col } from 'react-bootstrap';

class First_Search extends React.Component {
  constructor(props) {
    super(props);
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
  }

  /*



  */

  render(){
    return(
    <div  id="First_Search_outer_div">
      <div id="First_Search_inner_div">
        <Head />
      </div>
      <div className={styles.first_search_main_grid}>
        <div className={styles.first_search_main_map}>
          <GMap coordinates={[]}/>
        </div>
        <Grid className={styles.grid}>
          <Row>
            <Col mdHidden smHidden xsHidden lg={12}>
              <div className={styles.navigation}>
                <Navigation />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={4} className={styles.first_search_right_column}>
              <Featured_Venues />
            </Col>
            <Col md={12} lg={7} className={styles.first_search_left_column}>
              <Event_Details />
            </Col>
          </Row>
        </Grid>
      </div>
      <div>
        <Foot/>
      </div>
    </div>
    );
  }
/*
<Col mdHidden smHidden xsHidden lg={2}/>
<Col mdHidden smHidden xsHidden lg={3}/>
*/


}

export default First_Search;
