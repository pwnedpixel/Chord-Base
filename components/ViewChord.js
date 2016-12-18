import React from 'react'
import {Link} from 'react-router'
import DefaultHeader from './DefaultHeader'
import BottomBar from './BottomBar'
import {FormGroup, ControlLabel, FormControl, Label, Button, Well,Modal,} from 'react-bootstrap'

class ViewChord extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      chord: [],
      lgShow:false,
      title:'',
      body:''
    }
    this.componentDidMount=this.componentDidMount.bind(this)

  }

  componentDidMount() {
    let song = [];
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
            _this.setState({
              title: item.title,
              body: item.body,
            });
          })

          _this.setState({
            chord: data
          });
        }
    });
  //  console.log("inside mount: ", this)
  }

  componentWillUpdate(nextProps, nextState){
    //console.log(nextState);
  }

  render() {
    //console.log("Render ", this);
    let lgClose = () => this.setState({ lgShow: false });
    return (
      <div>
      <div>
        <DefaultHeader />
      </div>

      <div style={{marginLeft:50,  marginRight:50}}>
        <h2>
          {
            this.state.chord.map((item, index)=>{
              return (<Label bsStyle="default" key={index}>{item.title}</Label>);
            })
          }
        </h2>
          {
            this.state.chord.map((item, index)=>{
              return (<h6 key={index}>Author: {item.author}</h6>);
            })
          }
          {
            this.state.chord.map((item, index)=>{
              return (<h6 key={index}>Creation Date: {item.createDate}</h6>);
            })
          }
        <Well style={{padding:"0"}}>
          <FormControl disabled style={{minHeight:"300px", resize:"none", cursor:"pointer", border:"none", }} value = {this.state.body} componentClass="textarea" placeholder="textarea" />
        </Well>

          <Button bsStyle="primary" onClick={()=>this.setState({ lgShow: true })}>
          Launch Reading Mode
          </Button>
          <MyLargeModal
            params={{
              body:this.state.chord.map((item, index)=>{
                return (<Well style={{fontSize:"120%"}} key={index}>{item.body}</Well>);
              }),
              title:this.state.chord.map((item, index)=>{
                return (<Label bsStyle="default" key={index}>{item.title}</Label>);
              })
            }}
            show={this.state.lgShow}
            onHide={lgClose}
            dialogClassName="custom-modal"
          />
      </div>
      <BottomBar />
    </div>
    );
  }
}
const MyLargeModal = React.createClass({

  render() {
    console.log("Render ", this.props.params);
    const _this = this;
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.params.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.params.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default ViewChord;
