import React, { Component } from 'react';
import ResultsTable from './ResultsTable';
import URL, { URL2 } from './URL';

class SelectedVenues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedVenues:{}}
  }

  componentWillMount(){
    let current = this;
    fetch(URL2+"/select/all", {
          credentials: 'include',
          method: 'POST',
          headers: {
        	  'Accept': 'application/json',
        	  'Content-Type': 'application/json'},
      	  body: ''
          }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){

            }else{
              current.setState({selectedVenues: data})
              console.log(data);
            }
            })
  }

//<ResultsTable searchResult={this.state.selectedVenues}/>

  render() {
    return (
      <div>
  	     <ResultsTable searchResult={this.state.selectedVenues} button={true} buttonAction='Remove'/>
         <button onClick={this.removeAllVenues.bind(this)}>Remove all</button>
  	  </div>
    );
  }

  removeAllVenues(e){
    //console.log(e);
    fetch(URL2+"/select/remove/all", {
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

export default SelectedVenues;
