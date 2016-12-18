import React from 'react';
import {Button, Grid,Row, Col, Panel, Table,ListGroup,ListGroupItem, alertClicked,Well} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { Navigation } from 'react-router'
import { Link } from 'react-router'

export default React.createClass({

  _alertClicked: function() {
    this.transitionTo('/login')
  },
  render() {
    const tableStyle = {
      marginLeft:50,
      marginRight:50

    };

    return (
      <div style={{textAlign:"center"}}>
      <h1>Welcome to ChordBase</h1>
      <Well style={{marginLeft:"10%",marginRight:"10%"}}><h4>ChordBase: Creating, Displaying and Sharing guitar chords and song lyrics.</h4></Well>
        
      </div>
    );
  }

})
