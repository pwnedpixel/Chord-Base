import React from 'react'
import {Navbar,NavItem,MenuItem, NavDropdown,Nav,Button,Label} from 'react-bootstrap'
import {Link} from 'react-router'


  export default React.createClass({
    getInitialState() {
      return {
        selectedIndex: 0
      };
    },


    render() {
      return (
        <Navbar fixedBottom>

    <Nav>

      <NavItem>
        <Link to='/privacy_policy' style={{textDecoration: 'none', color: '#757575'}}>
          Privacy Policy
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/dmca' style={{textDecoration: 'none', color: '#757575'}}>
          DMCA Policy
        </Link>
      </NavItem>
    </Nav>
      </Navbar>
      );
    }
  });
