import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Homepage from './components/Homepage/Homepage'
import RouteSelection from './components/RouteSelection/RouteSelection'
import LogOrsign from './components/Login-Signup/LogOrsign'
import Signup from './components/Login-Signup/Signup'
import Profile from './components/Profile/Profile'
import TicketPage from './components/TicketPage/TicketPage'
import PaymentTab from './components/PaymentTab/PaymentTab'
 import JJt from "./components/JJt/JJT"

import StripeContainer from './components/PaymentTab/StripeContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact render={props => <Homepage {...props} />} />
             <Route path="/login" render={props => <LogOrsign {...props} />} />
        <Route path="/register" render={props => <Signup {...props} />} />
           <Route path="/routes" exact render={props => <RouteSelection {...props} />} />
          <Route path="/profile" exact render={props => <Profile {...props} />} />
          <Route path="/getTicket" exact render={props => <TicketPage {...props} />} />
          <Route path="/payment" exact render={props => <StripeContainer {...props} />} />
          <Route path="/JJT" exact render={props => <JJt {...props} />} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
