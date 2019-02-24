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
          <div className={styles.head_container}>
            <div className={styles.head_center_container}>
              <a href="/"><img src="/images/design/group.svg"/></a>
              <a href="/view/events" className={styles.head_event_link}>EVENT</a>
              <a href="/offers" className={styles.head_offers_link}>
                <div className={styles.head_shortlist_button}>
                  <span className={styles.head_shortlist_count_container}>
                    <span className={styles.head_shortlist_count_text}>
                      {this.state.count_offer}
                    </span>
                  </span>
                  <span className={styles.head_shortlist_text}>
                    OFFERS
                  </span>
                </div>
              </a>
              <a href="/shortlist" className={styles.head_shortlist_link}>
                <div className={styles.head_shortlist_button}>
                  <span className={styles.head_shortlist_count_container}>
                    <span className={styles.head_shortlist_count_text}>
                      {this.state.count_shortlist}
                    </span>
                  </span>
                  <span className={styles.head_shortlist_text}>
                    SHORTLIST
                  </span>
                </div>
              </a>
            </div>
          </div>
        );
    }
}

export default Head;
