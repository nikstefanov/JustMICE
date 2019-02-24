import React, { Component } from 'react';

class Head extends Component {
   render() {
     var h=this.props.h
        return (
          <div>
          <span id="clickedlinkvenue" onClick={function(){window.location.hash="/";}}>Meeting rooms</span><span id="unclickedlinkvenue" onClick={function(){window.location.hash="/description";}}>Hotel description</span>
            <table>
            <tbody>
            <tr><td className="columns-cell" id="mroomcell"><span className="columns-text" >Meeting room</span></td><td className="columns-cell"><span className="columns-text">Room size   (sq.ft.)</span></td>{h.columns}</tr>
            {h.table}
            </tbody>
            </table>
          </div>
        );
    }
}

export default Head;
