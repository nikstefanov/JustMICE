import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import URL, { URL2 } from './URL';

import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

class FirstSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', city: '', start_date: moment(), end_date: moment(), attendees: '', rooms: '',
      user: '',cityOptions: [], errors: '',searchResult: []};
    }

    componentDidMount(){
        let current = this
        fetch(URL2+"/searchresults/getcities", {
              credentials: 'include',
              method: 'GET',
              }).then((resp) => resp.json())
              .then(function(data) {
                if(data.error){

                }else{
                  current.setState({cityOptions: data})
                }
                })
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} method="post" accept-charset="UTF-8">
  	<table>
      <tbody>
  	  <tr><td><h3>Search form</h3></td></tr>
  	  <tr>
  	    <td>
  	      <label>
  		Event name:
  	      </label>
  	    </td>
  	    <td>
  	      <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
  	    </td>
  	  </tr>
  	  <tr>
  	    <td>
  	      <label>
  		City:
  	      </label>
  	    </td>
  	    <td>
  	      <Select name="city" value={this.state.city} onChange={this.handleChangeCity}
  		  simpleValue required options={this.state.cityOptions}/>

  	    </td>
  	  </tr>
  	  <tr>
  	    <td>
  	      <label>
  		Start date:
  	      </label>
  	    </td>
  	    <td>
  	      <DatePicker name="start_date" required selected={this.state.start_date} onChange={this.handleChangeStartDate} />

  	    </td>
  	  </tr>
  	  <tr>
  	    <td>
  	      <label>
  		End date:
  	      </label>
  	    </td>
  	    <td>
  	      <DatePicker name="end_date" required selected={this.state.end_date} onChange={this.handleChangeEndDate} />

  	    </td>
  	  </tr>
  	  <tr>
  	    <td>
  	      <label>
  		Number of attendees:
  	      </label>
  	    </td>
  	    <td>
  	      <input type="text" name="attendees" value={this.state.num_attendees} onChange={this.handleChange} />
  	    </td>
  	  </tr>
  	  <tr>
  	    <td>
  	      <label>
  		Number of room:
  	      </label>
  	    </td>
  	    <td>
  	      <input type="text" name="rooms" value={this.state.num_rooms} onChange={this.handleChange}/>
  	    </td>
  	  </tr>
  	  <tr>
  	    <td/>
  	    <td><input type="submit" value="Search Venues" /></td>
  	  </tr>
      </tbody>
  	</table>
        </form>
      );
    }
  }

  export default FirstSearch;

}
