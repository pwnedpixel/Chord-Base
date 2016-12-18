import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import Home from './components/Home';
import ViewChord from './components/ViewChord'
import ChordEdit from './components/ChordEdit'
import PublicChords from './components/PublicChords'
import PrivacyPolicy from './components/PrivacyPolicy'
import Login from './components/Login'
import {Router, Route, browserHistory} from 'react-router'
import DMCAPolicy from './components/DMCAPolicy'

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render ((

  <Router history={browserHistory}>
    <Route path="/" component={Home}></Route>
    <Route path='/login' component={Login}></Route>
    <Route path='/edit/:id' component = {ChordEdit}></Route>
    <Route path='/edit' component = {ChordEdit}></Route>
    <Route path='/view/:id' component = {ViewChord}></Route>
    <Route path='/public' component = {PublicChords}></Route>
    <Route path='/privacy_policy' component = {PrivacyPolicy}></Route>
    <Route path='dmca' component = {DMCAPolicy}></Route>
  </Router>
), document.getElementById('app'))

//ReactDOM.render(<Home />, document.getElementById('app'))
