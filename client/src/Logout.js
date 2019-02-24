import React, { Component } from 'react';
import URL from './URL'
class LoginForm extends Component {

  componentWillMount(){
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    fetch(URL+"/api/user/logout", {
          credentials: 'include',
          method: 'GET',
          headers : myHeaders
          }).then((resp) => resp.json()) // Transform the data into json
          .then(function(data) {
              document.location="/"
            })
  }


   render() {
        return (
          <div></div>
        );
    }
}

export default LoginForm
;
