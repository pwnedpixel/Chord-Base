import React from 'react'
import {Link,browserHistory} from 'react-router'
import DefaultHeader from './DefaultHeader'
import BottomBar from './BottomBar'
import PublicChordsPane from './PublicChordsPane'
import {Table,FormGroup, ControlLabel, FormControl, Label, Button, ListGroup, ListGroupItem} from 'react-bootstrap'

class PublicChords extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ListOfSongs:[],
      ListOfUserSongs:[]
    }
    this.componentDidMount=this.componentDidMount.bind(this)

  }
  componentDidMount() {
    let array = [];
    const _this = this;
    console.log("COMPOnent did moount");
    $.ajax({
        type: 'GET',
        url: 'https://lab5-akeech.c9users.io:8081/api/song/p',
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        success: function(data) {
          _this.setState({
            ListOfSongs: data
          });
        }
    });
    var username = localStorage.getItem("username")
    $.ajax({
        type: 'GET',
        url: 'https://lab5-akeech.c9users.io:8081/api/song/u/'+username,
        data: {
            get_param: 'value'
        },
        dataType: 'json',
        success: function(data) {
          _this.setState({
            ListOfUserSongs: data
          });
        }
    });



    // console.log(this);
  }

  _onNew() {
    if (localStorage.getItem("username")!=null) {
      console.log(localStorage.getItem("username"))
      browserHistory.push('/edit/newChordSheet');
    } else {
      alert("Must Be Logged In")
    }
  }

  componentWillUpdate(nextProps, nextState){
    console.log(nextState);
  }

  // {this.props.listFromDatabase.map((item)=>{
  //   <PublicChordsPane props={item}/>
  // })}

  render() {
    return (
      <div>
      <div>
        <DefaultHeader />
      </div>
      <div style={{marginLeft:50,  marginRight:50}}>
        <h3>
          <Label bsStyle="default">Public Chords</Label>
        </h3>
        <Table responsive>
          <thead style={{minWidth: '100%'}}>
            <tr style={{minWidth: '100%'}}>
              <th style={{width: '50%'}}>Song Title:</th>
              <th style={{width: '50%'}}>Created By:</th>
            </tr>
          </thead>
          <tbody>
             {this.state.ListOfSongs.map((item, index)=>{
               return ( <PublicChordsPane key={index} chord={item}/>);
             })}
          </tbody>
        </Table>
      </div>
      <div style={{marginLeft:50,  marginRight:50}}>
        <h3>
          <Label bsStyle="default">Private Chords</Label>
        </h3>
        <Table responsive>
          <thead style={{minWidth: '100%'}}>
            <tr style={{minWidth: '100%'}}>
              <th style={{width: '50%'}}>Song Title:</th>
              <th style={{width: '50%'}}>Created By:</th>
            </tr>
          </thead>
          <tbody>
             {this.state.ListOfUserSongs.map((item, index)=>{
               return ( <PublicChordsPane key={index} chord={item}/>);
             })}
          </tbody>
        </Table>

        <Button bsStyle="success" onClick={() =>{this._onNew()}}>Create New ChordSheet</Button>
      </div>
      <BottomBar />
    </div>
    );
  }
}

export default PublicChords
