'use strict';
import React from 'react'
import GoogleLogin from 'react-google-login';

export default React.createClass({
  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div>
      <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        </div>
    );
  }
})
