import React, { Component } from 'react';
import Script from './Script'

class App extends Component {

  componentDidMount(){
    var Script = document.createElement("Script");
    console.log(this.props)
    Script.src = this.props.src;
    Script.async = false;

    document.body.appendChild(Script);
  }
   render() {

        return (
            <span></span>
        );
      }

}

export default App;
