import React, { Component } from 'react';
import { Row,Grid,Col } from 'react-bootstrap';
import styles from '../Style/Head.css';
import URL, { URL2 } from '../URL';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {count_shortlist: 0, user: {}}
  }

  componentWillMount() {
    this.getShortlistCount();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getShortlistCount(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getShortlistCount() {
    let current = this
    fetch(URL2+"/offer/count", {
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
                count_shortlist: data.success,
                user: data.user
              });
                //console.log('Count:'+data.success);
            }
            })

  }

   render() {
        return (
          <Row className="show-grid cheader">
            <Col mdHidden={true} lg={1}></Col>
            <Col xsHidden={true} smHidden={true} md={2} lg={2}>
              <a href="/"><img src="/images/design/group.svg" style={{padding: "10px"}}/></a>
            </Col>
            <Col xs={1} sm={1} md={2} lg={1}></Col>
            <Col xs={2} sm={3} md={1} lg={1} style={{paddingLeft: "0px"}}><a href="/view/offers" style={{paddingLeft: "0px"}} className="menuitem" >OFFERS</a></Col>
            <Col xs={4} sm={4} md={3} lg={2}>
              <a href="/view/rfps" className={styles.head_shortlist_link}>
                <div className={styles.head_shortlist_button}>
                  <span className={styles.head_offers_count_container}>
                    <span className={styles.head_offers_count_text}>
                      {this.state.count_shortlist}
                    </span>
                  </span>
                  <span className={styles.head_shortlist_text}>
                    RFPs
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
            </div></div><a href="#" className="menuitem">EN</a>
            </Col>
          </Row>
        );
    }
}

export default Head;
