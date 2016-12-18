import React from 'react'
import {Navbar,NavItem,MenuItem, NavDropdown,Nav,Button,Label} from 'react-bootstrap'
import {Link} from 'react-router'
import BottomBar from './BottomBar'
import DefaultHeader from './DefaultHeader'

export default React.createClass({

    render() {
      return (
        <div>
        <div style={{position:"fixed",width:"100%"}}>
        <DefaultHeader />
      </div>
        <div style={{marginLeft:"50px", marginRight:"50px", paddingTop:"75px"}}>

          <div>
              <p>ChordBase.com respects the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please follow our Notice and Procedures for Making Claims of Copyright Infringement below.</p>
              <h2>Notice and Procedure for Making Claims of Copyright Infringement Pursuant to the Digital Millennium Copyright Act.</h2>
              <p>If you believe that you hold a claim of copyright infringement against ChordBase.com, submit notice of your claim to the following Designated Agent:</p>
              <ul>
                <li>Service Provider: ChordBase.com</li>
                <li>Email Address to Which Notification Should Be Sent: <strong>admin [AT] ChordBase [DOT] com</strong></li>
              </ul>
              <p>To be effective, the notification of your claim of copyright infringement should be written and should include the following:</p>
              <ul>
                <li>A statement that you are the owner of the exclusive right you claim has been infringed, or a statement that you are authorized to act on behalf of the owner of an exclusive right that has allegedly been infringed.</li>
                <li>A statement, under penalty of perjury, that the information in the notification is accurate.Your signature. (The signature may be electronic.)</li>
                <li>The identification of the copyrighted work you claim has been infringed. (If you claim that multiple copyrighted works have been infringed you can submit one notification with a list of the allegedly infringed works.)</li>
                <li>Identification of the material that you claim to be infringing and information reasonably sufficient to permit ChordBase.com to locate the material.</li>
                <li>Information reasonably sufficient to permit ChordBase.com to contact you, including your address, telephone number, fax number and, if available, an electronic mail address. <em>You can provide contact information for the owner of the exclusive right that you claim has been infringed if you are not the owner, but rather authorized to act on behalf of the owner.</em></li>
                <li>A statement you have a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
              </ul>
              <p>ChordBase.com will respond to any DMCA complaints in a timely manner. Should you be the copyright holder of a specific piece of content featured on this site without your permission, ChordBase.com will remove it in a timely manner once notified.</p>
            </div>

        </div>
        <BottomBar />
      </div>
      );
    }
  });
