import React from 'react';
import {form, FormGroup, ControlLabel, FormControl,ReactDOM} from 'react-bootstrap';

export default React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length > 0) return 'success';
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  render() {
    return (
      <form >
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}>
          <p style={{color:"#757575"}}>{this.props.prompt}</p>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Type Here"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
});
