import React from 'react'
import {Navbar,NavItem,MenuItem, NavDropdown,Nav,Button,Label} from 'react-bootstrap'
import {Link} from 'react-router'

export default React.createClass({

  render() {

    return (
    <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a style={{color:"#FFFFFF", paddingTop:"21px", fontSize:"180%"}} href="/">ChordBase</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text>
        <Link to='/public'>
        <Button>View Chords</Button></Link>
      </Navbar.Text>
      {
        localStorage.getItem('username') ?
        <Navbar.Text pullRight>
          <Link to='/'>
          <Button onTouchTap={() => localStorage.removeItem('username')} bsStyle="danger">Logout</Button></Link>
        </Navbar.Text>  :
        <Navbar.Text pullRight>
          {
            () => {
              if (localStorage.getItem("username")!=null) return (localStorage.getItem("username"));
            }
          }
          <Link to='/login'>
          <Button bsStyle="primary">Login or Join</Button></Link>
        </Navbar.Text>
      }

    </Navbar.Collapse>
  </Navbar>

    )
  }
})
