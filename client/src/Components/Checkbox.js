import React from 'react';
import '../Style/Checkbox.css';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: false}
  }






  render(){




    return(
      <div className="container">
        <input type="checkbox" className="regular_checkbox" />
        <span className="">this.props.label</span>
      </div>
    );
  }
}
export default Checkbox;
