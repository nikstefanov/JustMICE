import React from 'react';
import styles from '../Style/Style.css';
import { Row,Grid,Col } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="navhead">
        <a href='/first_search'>
          <div className="greynav">
            <div className="centeredtext">Search</div>
          </div>
          <div className="greyarrow" />
        </a>
        <a href='/shortlist'>
          <div className="whitenav">
            <div className="centeredtext">Requirements & Accommodation</div>
          </div>
        </a>
        <div className="whitearrow"/>
        <div className="bluenav">
          <div className="centeredtext">Summary & Submit</div>
        </div>
      </div>
    );
  }


}

export default Navigation;
