import React from 'react';
import Login from './Login';
import { Link } from 'react-router'
import {Jumbotron, Button, Grid,Row, Col, Well, Collapse,PageHeader} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { Navigation } from 'react-router'


export default React.createClass({
  _onClick: function (){
    this.transitionTo('/login')
  },

  render() {
    const style = {
    height: 300,
    width: "100%",
    margin:"0",

  };
  const btnStyle = {
    margin:12,
    pading:0,
    width:100,
    height:50,
  };

  return (
    <div style={{textAlign:"center", marginTop:0}}>
    <Jumbotron style={{backgroundColor:"#000000"}}>
      <h1 style={{color:"white"}}>ChordBase</h1>
      <p style={{color:"#a5a5a5"}}>Your source of lyrics and chords</p>

      <p>
        {
        localStorage.getItem('username') ?
        <Link to='/'>
        <Button onTouchTap={() => localStorage.removeItem('username')} bsStyle="danger">Logout</Button>
      </Link> :
      <Link to='/login'>
      <Button bsStyle="primary">Login or Join</Button></Link>
        }
        <Link to='/public'>
        <Button style={{marginLeft:30}} bsStyle="success">Continue to Site</Button></Link>
      </p>

      </Jumbotron>
    </div>
  )

  }


})
