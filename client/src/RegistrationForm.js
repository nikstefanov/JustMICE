import React, { Component } from 'react';
import URL from './URL'
class LoginForm extends Component {




   render() {
     function logIn(){
        let login = {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          name: document.getElementById("name").value,
          username: document.getElementById("username").value,
          role: document.getElementById("role").value
        }
        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        fetch(URL+"/api/user/register", {
              credentials: 'include',
              method: 'POST',
              headers : myHeaders,
              body:JSON.stringify(login)
              }).then((resp) => resp.json()) // Transform the data into json
              .then(function(data) {
                if(data.success){
                  document.getElementById("result").innerText = "Success"
                }else{
                  document.getElementById("result").innerText = "Error"
                }
                })


        }



        return (
          <div>
          <h1> Register </h1>
              <div id="result"></div>
              <input type="text"  name="username" id="username"/><br/>
              <input type="password"  name="password" id="password"/><br/>
              <input type="email"  name="email" id="email"/><br/>
              <input type="text"  name="name" id="name"/><br/>
              <select name="role" id="role">
                <option value="1">Admin</option>
                <option value="2">Hotel User</option>
                <option value="3">Corporation Booker</option>
              </select>
          <button onClick={logIn}>
            Register
          </button>
          </div>
        );
    }
}

export default LoginForm
;
