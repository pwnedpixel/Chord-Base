import React from 'react'
import {Link, browserHistory} from 'react-router'
import DefaultHeader from './DefaultHeader'
import BottomBar from './BottomBar'
import {FormGroup, ControlLabel, FormControl, Label, Button,HelpBlock, Checkbox} from 'react-bootstrap'

class ChordEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      TitleField:'new_Title',
      TextField:'',
      isPublic: true,
      chord:{}
    }
    this.handleTitleChange=this.handleTitleChange.bind(this)
    this.handleBodyChange=this.handleBodyChange.bind(this)
    this._saveSong=this._saveSong.bind(this)
    this.getTitleValidationState=this.getTitleValidationState.bind(this)
    this._togglePublic=this._togglePublic.bind(this)
  }

  componentDidMount() {
    if (this.props.params.id != 'newChordSheet') {
      const _this = this;
      console.log("COMPOnent did moount");
      $.ajax({
          type: 'GET',
          url: 'https://lab5-akeech.c9users.io:8081/api/song/f/'+this.props.params.id,
          data: {
              get_param: 'value'
          },
          dataType: 'json',
          success: function(data) {

            data.map((item, index)=>{
              console.log(false==(item.public=="true"))
              _this.setState({
                TitleField: item.title,
                TextField: item.body,
                isPublic: (item.public=="true")
              });

            })
          }
      });
      console.log("Getting here ",this.state.isPublic)
      // if (this.state.chord.public == "true") {
      //   this._togglePublic()
      // }
    }
  }
  _saveSong() {
    if (this.getTitleValidationState()!='error')
    {
      var username=''
      if (localStorage.getItem("username")=='')
      {
        username = 'anon'
      } else {
        username = localStorage.getItem("username")
      }

      if (this.props.params.id == 'newChordSheet')
      {
        https:
                $.post("https://lab5-akeech.c9users.io:8081/api/song", {
                title: this.state.TitleField,
                author: username,
                body: this.state.TextField,
                createDate:(new Date()).toString().split(' ').splice(1,3).join(' '),
                public: this.state.isPublic
            });
        browserHistory.push('/public');
      } else {

        $.ajax({
            type: 'PUT',
            url: "https://lab5-akeech.c9users.io:8081/api/song/f/"+this.props.params.id,
            data: {
              title: this.state.TitleField,
              author: username,
              body: this.state.TextField,
              createDate:(new Date()).toString().split(' ').splice(1,3).join(' '),
              public: this.state.isPublic
            },
            dataType: 'json',
            success: function() {
              console.log("Song updated")
              browserHistory.push('/public');
            }
        });
      }
    }
  }

  clearTextArea() {
    document.getElementById('textAreaBox').value = ""
  }

  handleTitleChange(e) {
    this.setState({TitleField : e.target.value});
  //  console.log("regpass")
  }

  handleBodyChange(e) {
    this.setState({TextField : e.target.value});
  }

  getTitleValidationState() {
    const length = this.state.TitleField.length;
    if (length < 1) return 'error';
    return 'success'
  }

  _togglePublic() {
    this.setState({
      isPublic:!this.state.isPublic
    })
  }

  render() {
    console.log("isPublic: ",this.state.isPublic)
    return (
      <div>
      <div>
        <DefaultHeader />
      </div>
      <div style={{marginLeft:50,  marginRight:50}}>
        <FormGroup validationState={this.getTitleValidationState()}>
          <FormControl
            type="text"
            value={this.state.TitleField}
            placeholder="Enter a Song Title"
            onChange={this.handleTitleChange}
          />
          <HelpBlock>
            {
              this.getTitleValidationState() == 'error' ?
              `Enter a Song Title` :
              ``
            }
          </HelpBlock>
      </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Edit Lyrics and Chords</ControlLabel>
          <FormControl value={this.state.TextField} onChange={this.handleBodyChange} style={{height:300}} id="textAreaBox" componentClass="textarea" placeholder="Example: [C]I like donuts, [G]I like them a lot" />
        </FormGroup>
        <Button bsStyle="success" onClick={this._saveSong}>Save Changes</Button>
        <Button style={{marginLeft:"20px"}} bsStyle="danger" onClick={this.clearTextArea}>Clear</Button>
        <Checkbox checked={this.state.isPublic? true : false } onChange={()=>{this._togglePublic()}} inline style={{marginLeft:"20px"}}>
        Make Public?
        </Checkbox>

      </div>


      <BottomBar />
    </div>
    );


  }
}

export default ChordEdit;
