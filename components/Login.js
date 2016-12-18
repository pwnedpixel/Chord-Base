import React from 'react'
import Textfield from './mini/Textfield'
import PassField from './mini/PassField'
import DefaultHeader from './DefaultHeader'
import { Link, browserHistory } from 'react-router'
import {Row, Col, Grid, Button, Panel,Label,FormControl,FormGroup,HelpBlock} from 'react-bootstrap'
import LoginGoogle from './mini/LoginGoogle'
import BottomBar from './BottomBar'
var bcrypt = require('bcryptjs');

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      RegPassField: '',
      RegUserField:'',
      LoginUsrField:'',
      LoginPassField:''
    }
    this.handleRegUserChange=this.handleRegUserChange.bind(this)
    this.handleRegPassChange=this.handleRegPassChange.bind(this)
    this.handleLogUserChange=this.handleLogUserChange.bind(this)
    this.handleLogPassChange=this.handleLogPassChange.bind(this)
    this._login=this._login.bind(this)
    this._register=this._register.bind(this)
    this._checkUserName=this._checkUserName.bind(this)

  }
  handleRegPassChange(e) {
    this.setState({RegPassField : e.target.value});
  //  console.log("regpass")
  }
  handleRegUserChange(e) {
    this.setState({RegUserField: e.target.value})
  //  console.log("Value  " +e.target.value);

  }
  handleLogUserChange(e) {
    this.setState({LoginUsrField: e.target.value});
  }
  handleLogPassChange(e) {
    this.setState({LoginPassField: e.target.value});
  //  console.log("logpass")
  }

  _login(){
    console.log("LOGIN")

    if (this.getLoginEmailValidationState() != 'error') {
      var nameToGet = this.state.LoginUsrField
      var passwordToComp =this.state.LoginPassField
      const _this = this;
      $.ajax({
          type: 'GET',
          url: 'https://lab5-akeech.c9users.io:8081/api/usr/u/'+nameToGet,
          data: {
              get_param: 'userName'
          },
          dataType: 'json',
          success: function(data) {
              $.each(data, function(index, element) {
                  if ((element.userName == nameToGet) && (bcrypt.compareSync(passwordToComp, element.password)==true)) {
                        console.log(_this)
                        console.log("loggin success")
                        localStorage.setItem("username", element.userName)
                        browserHistory.push('/public');
                  } else {
                      alert("Invalid Username/Password Combination");
                  }
              });
              if (data.length ==0) {
                alert("Invalid Username/Password Combination");
              }
          },


      });
    }
  }

  getEmailValidationState() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!this.state.RegUserField.match(re) && this.state.RegUserField !='') return 'error'
  }

  getLoginEmailValidationState() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!this.state.LoginUsrField.match(re) && this.state.LoginUsrField !='') return 'error'
  }

  _register(){
    console.log("REGISTER")
    //alert(this.state.RegUserField)
    //alert("register")
    const _this=this;
    $.ajax({
        type: 'GET',
        url: 'https://lab5-akeech.c9users.io:8081/api/usr/u/'+this.state.RegUserField,
        data: {
            get_param: 'userName'
        },
        dataType: 'json',
        success: function(data) {
          console.log(data,data.length)
          if (data.length == 0) {
            
            if ((_this.getEmailValidationState() != 'error')) {
              var salt = bcrypt.genSaltSync(10);
              var hash = bcrypt.hashSync(_this.state.RegPassField, salt);
              var userName = _this.state.RegUserField
              https:
                $.post("https://lab5-akeech.c9users.io:8081/api/usr", {
                userName: userName,
                password: hash
              });
              alert("Registered!")
            }
            
          } 
          else {
            alert("email in use")
          }
        },
    });
  }

  _checkUserName() {
    console.log("checkUserName")
    //return true if available
    var toReturn = false
    $.ajax({
        type: 'GET',
        url: 'https://lab5-akeech.c9users.io:8081/api/usr/u/'+this.state.RegUserField,
        data: {
            get_param: 'userName'
        },
        dataType: 'json',
        success: function(data) {
          console.log(data,data.length)
          if (data.length == 0) {
            
            if ((this.getEmailValidationState() != 'error')) {
              var salt = bcrypt.genSaltSync(10);
              var hash = bcrypt.hashSync(this.state.RegPassField, salt);
              var userName = this.state.RegUserField
              https:
                $.post("https://localhost:3000/api/usr", {
                userName: userName,
                password: hash
              });
              alert("Registered!")
            }
            
          } 

        },
    });
    console.log(toReturn)
  }



  render() {
    const loginTitle = (
      <h3>Login</h3>
    );
    const registerTitle = (
      <h3>Register</h3>
    );
    const {RegUserField,RegPassField,LoginUsrField,LoginPassField} = this.state;
    return (
      <div style={{textAlign:"center"}}>
        <DefaultHeader />
        <Grid>
          <Row className="show-grid">
          <Col sm={6} md={6}>
        <div id="loginDiv">
          <Panel header={loginTitle}>
          <Grid>
            <Row className="show-grid">
              <Col sm={5} md={5}>
                  <FormGroup validationState={this.getLoginEmailValidationState()}>
                  <FormControl
                    type="text"
                    value = {LoginUsrField}
                    placeholder="Enter Your Username:"
                    onChange={this.handleLogUserChange}
                  />
                  <HelpBlock>
                    {
                      this.getLoginEmailValidationState() == 'error' ?
                      `Enter your Email (must be valid)` :
                      `Enter your Email`
                    }
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col sm={5} md={5}>
                  <FormGroup>
                  <FormControl
                    type="password"
                    value = {LoginPassField}
                    placeholder="Enter Password"
                    onChange={this.handleLogPassChange}
                  />
                  <HelpBlock>Enter Password</HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col sm={5} md={5}>
                <p>

                  <Button onClick={this._login} bsStyle="primary">Login</Button></p>
              </Col>

            </Row>
          </Grid>
          </Panel>
        </div>
      </Col>



      <Col sm={6} md={6}>
        <div id="registerDiv">
          <Panel header={registerTitle}>
          <Grid>
            <Row className="show-grid">
              <Col sm={5} md={5}>
                <FormGroup validationState={this.getEmailValidationState()}>
                <FormControl
                  type="text"
                  value = {RegUserField}
                  placeholder="Enter a Username:"
                  onChange={this.handleRegUserChange}

                />
                <HelpBlock>
                  {
                    this.getEmailValidationState() == 'error' ?
                    `Enter your Email (must be valid)` :
                    `Enter your Email`
                  }
                </HelpBlock>
              </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col sm={5} md={5}>
                <FormGroup>
                <FormControl
                  type="password"
                  value={RegPassField}
                  placeholder="Enter a Pasword:"
                  onChange={this.handleRegPassChange}
                />
                <HelpBlock>Enter a Password</HelpBlock>
              </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col sm={5} md={5}>
                <p>

                  <Button onClick={() => {this._register()}} bsStyle="primary">Register</Button></p>
              </Col>

            </Row>
          </Grid>
          </Panel>
        </div>
      </Col>
      </Row>

      <Row className="show-grid">

      </Row>
        </Grid>
        <BottomBar />
      </div>

    )
    }
}

export default Login;
