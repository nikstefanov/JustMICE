import React, { Component } from 'react';
import URL from './URL'
import Foot from './Components/Foot'

import { Row,Grid,Col,Navbar,Nav,NavItem } from 'react-bootstrap';
class LoginForm extends Component {


  componentWillMount(){
    let current = this
    fetch(URL+"/api/user/getinfo", {
          credentials: 'include',
          method: 'GET',
          headers : new Headers(),
          }).then((resp) => resp.json())
          .then(function(data) {
            if(!data.error){
              document.location="/"
            }else{
              current.setState({user: data})
              var input = document.getElementById("email");
              input.addEventListener("keyup", function(event) {
                  event.preventDefault();
                  if (event.keyCode === 13) {
                      document.getElementById("sign-in-button").click();
                  }
              });
              input = document.getElementById("password");
              input.addEventListener("keyup", function(event) {
                  event.preventDefault();
                  if (event.keyCode === 13) {
                      document.getElementById("sign-in-button").click();
                  }
              });
            }
            })
  }

   render() {
     function logIn(){
        let login = {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        }
        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        fetch(URL+"/api/user/login", {
              credentials: 'include',
              method: 'POST',
              headers : myHeaders,
              body:JSON.stringify(login)
              }).then((resp) => resp.json()) // Transform the data into json
              .then(function(data) {
                if(data.success){
                  if(data.user_role==2){
                    document.location="/view/rfps"
                  }else{
                    document.location="/first_search"
                  }//document.getElementById("result").innerText = "Success"
                }else{
                  alert("Wrong username or password")
                }
                })
        }
        document.body.style.backgroundImage = "url('/images/design/loginbckgimg.jpg')";

        return (
          <div>
            <Grid>
              <Row className="show-grid cheader">
                <Col xs={1} sm={1} md={2} lg={2}></Col>
                <Col xs={4} sm={4} md={2} lg={2}>
                  <a href="/"><img src="/images/design/group.svg" style={{padding: "10px"}}/></a>
                </Col>
                <Col xs={2} sm={3} md={4} lg={4}></Col>
                <Col md={4} lg={4}>
                  <a href="/signin" className="menuitem" >SIGN IN</a><a href="#" className="menuitem">EN</a>
                </Col>
              </Row>
              <Row className="show-grid" className="centercontainer">
                  <Col smHidden={true} md={2} lg={2}></Col>
                  <Col sm={7} md={5} lg={4}>
                    <div id="login-center">
                      <div id="login-label">If you already have an account, sign in. If you’d like to register, fil in your details, and wait for one of our operators to approve.</div>
                      <input type="text" id="email" onFocus={function(){document.getElementById("email").value='';}} defaultValue="email address" className="loginInputs"/>
                      <input type="password" id="password" onFocus={function(){document.getElementById("password").value='';}} defaultValue="password" className="loginInputs"/>
                      <button id="sign-in-button" onClick={logIn}>SIGN IN</button>
                      <a id="forgotpassword" href="/forgotpassword">Forgot password?</a>
                    </div>
                  </Col>
                  <Col sm={5} md={5} lg={3}>
                  <div id="logininfo">
                    <img src="/images/design/helpimage.jpg" width="312px"/>
                    <div id="logininfotext">Issues? Questions? Our representatives are always happy to help! </div>
                    <div id="helpnumber">+44 000 55 55</div>
                    <a id="reporttechnical" href="/report">Report technical issues</a>
                  </div>
                  </Col>
              </Row>
            </Grid>
            <footer className="cfooter" style={{position: "absolute", bottom: 0}}>
                <div className="footertext">
                <a href="/aboutus" className="footeritem">ABOUT US</a>
                <a href="/contact" className="footeritem">CONTACT</a>
                </div>
            </footer>
          </div>
              );
    }
}

export default LoginForm;
