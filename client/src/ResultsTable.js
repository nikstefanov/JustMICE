import React, { Component } from 'react';
import SearchResultTable from './SearchResultTable';

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
  }


  /*componentWillMount(){

  }*/

  render(){
    var tableRows = [];
    //console.log(this.props.searchResult);

    var searchResultEdited = [];
    for (var i = 0, len = this.props.searchResult.length; i < len; i++) {
      searchResultEdited.push(this.props.searchResult[i]);
      searchResultEdited[i].key = searchResultEdited[i].id;
    }
    //console.log(searchResultEdited);
    tableRows=searchResultEdited.map((item)=>

	    //<tr><td>{item.name}</td></tr>
      <SearchResultTable key={item.id} propertyInfo={item} button={this.props.button} buttonAction={this.props.buttonAction}/>
	  );

    return(
      <table>
	<tbody>
	{tableRows}
	</tbody>
      </table>

    );
  }



}

export default ResultsTable;
