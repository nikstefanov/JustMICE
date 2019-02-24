import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import EditForm from './EditForm'
import Logout from './Logout'
import Offers from './Offers'
import Head from './Components/Head'
import Foot from './Components/Foot'
import VenueDetails from './VenueDetails'
import MeetingRoomDetails from './MeetingRoomDetails'
import RegistrationForm from './RegistrationForm'
import SearchForm from './SearchForm'
import EventDetails from './EventDetails'
import EventsDetails from './EventsDetails'
import OffersDetails from './Hotel/OffersDetails'
import RFPsDetails from './Hotel/RFPsDetails'
import RFPDetails from './Hotel/RFPDetails'
import EditOffer from './Hotel/EditOffer'
import RFPDetailsID from './Hotel/RFPDetailsID'
import App from './App'
import Offer from './Offer'
import SelectedVenues from './SelectedVenues';
import First_Search from './First_Search/First_Search'
import Search_Results from './Search_Results/Search_Results'
import Shortlist from './Shortlist/Shortlist';


ReactDOM.render((
  <div>
  <BrowserRouter>
  <Switch>
    <Route exact path='/' component={App}/>
    <Route exact path='/signin' component={LoginForm}/>
    <Route exact path='/offers' component={Offers}/>
    <Route path='/register' component={RegistrationForm}/>
    <Route path='/view/venue/:id' component={VenueDetails}/>
    <Route path='/view/meeting_room/:mid' component={MeetingRoomDetails}/>
    <Route path='/profile' component={EditForm}/>
    <Route path='/logout' component={Logout}/>
    <Route path='/search' component={SearchForm}/>
    <Route path='/view/event/:id' component={EventDetails}/>
    <Route path='/view/events' component={EventsDetails}/>
    <Route path='/first_search' component={First_Search}/>
    <Route path='/search_results' component={Search_Results}/>
    <Route path='/shortlist' component={Shortlist}/>
    <Route path='/view/rfps' component={RFPsDetails}/>
    <Route path='/view/offers' component={OffersDetails}/>
    <Route path='/view/rfp/:id/:ofid' component={RFPDetailsID}/>
    <Route path='/offer/:id' component={Offer}/>
    <Route path='/view/edit/:id/:ofid' component={EditOffer}/>
    <Route path='/view/view/:id/:ofid' component={EditOffer}/>
    <Route path='/view/rfp/:id' component={RFPDetails}/>
  </Switch>
  </BrowserRouter>
  </div>
), document.getElementById("root"))
