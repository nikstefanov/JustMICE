import React, { Component } from 'react';
import {Row,Col} from 'react-bootstrap'
class Head extends Component {
   render() {
        return (
            <footer className="cfooter">
                <div className="footertext">
                <a href="/aboutus" className="footeritem">ABOUT US</a>
                <a href="/contact" className="footeritem">CONTACT</a>
                </div>
            </footer>
        );
    }
}

export default Head;
