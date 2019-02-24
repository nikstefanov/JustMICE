import React, { Component } from 'react';
import { Row,Grid,Col } from 'react-bootstrap';
import styles from '../Style/Head.css';
import URL, { URL2 } from '../URL';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {count_shortlist: 0,count_offer: 0, user: {}}
  }

  componentWillMount() {
    this.getShortlistCount();
    this.getOfferCount();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getShortlistCount(),
      2000
    );
    this.timerID1 = setInterval(
      () => this.getOfferCount(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerID1);
  }

  getOfferCount() {
    let current = this
    fetch(URL2+"/event/count", {
          credentials: 'include',
          method: 'GET',
          headers : new Headers(),
          }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
              current.setState({
                count_offer: 0
              });
            }else{
              current.setState({
                count_offer: data.success,
                user: data.user
              });
                console.log('Count:'+data.user);
            }
            })

  }

  getShortlistCount() {
    let current = this
    fetch(URL2+"/select/count", {
          credentials: 'include',
          method: 'GET',
          headers : new Headers(),
          }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){
              current.setState({
                count_shortlist: 0
              });
            }else{
              current.setState({
                count_shortlist: data.success
              });
                //console.log('Count:'+data.success);
            }
            })

  }

   render() {
        return (
        <Grid className={styles.head_container}>
          <Row className="show-grid cheader">
            <Col mdHidden={true} lg={1}></Col>
            <Col xsHidden={true} smHidden={true} md={2} lg={2}>
              <a href="/"><img src="/images/design/group.svg" style={{padding: "10px"}}/></a>
            </Col>
            <Col xsHidden={true} sm={1} md={2} lg={1}></Col>
            <Col xs={1} sm={2} md={1} lg={1} style={{paddingLeft: "0px"}}><a href="/view/events" style={{paddingLeft: "0px"}} className="menuitem" >EVENT</a></Col>
            <Col xs={6} sm={5} md={4} lg={3}>
            <a href="/offers" className={styles.head_shortlist_link} style={{ marginRight: "15px"}}>
              <div className={styles.head_shortlist_button} >
                <div className={styles.head_offers_count_container}>
                  <span className={styles.head_offers_count_text}>
                    {this.state.count_offer}
                  </span>
                </div>
                <span className={styles.head_offers_text}>
                  OFFERS
                </span>
              </div>
            </a>
              <a href="/shortlist" className={styles.head_shortlist_link}>
                <div className={styles.head_shortlist_button}>
                  <span className={styles.head_shortlist_count_container}>
                    <span className={styles.head_offers_count_text}>
                      {this.state.count_shortlist}
                    </span>
                  </span>
                  <span className={styles.head_shortlist_text}>
                    SHORTLIST
                  </span>
                </div>
              </a>
            </Col>
            <Col xs={5} sm={4} md={3} lg={3}>
              <div className="profile-dropdown" >
                <div className="dropbtn">{this.state.user.name} <img src='/images/design/profile.png' /></div>
                <div className="dropdown-content">
                  <a href="/profile">PROFILE</a>
                  <a href="/logout">SIGN OUT</a>
                </div>
              </div><a href="#" className="menuitem">EN</a>
            </Col>
          </Row>
        </Grid>
        );
    }
}

/*


*/


export default Head;
