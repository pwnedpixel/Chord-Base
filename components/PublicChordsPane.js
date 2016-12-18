import React from 'react'
import {Table,Button} from 'react-bootstrap'
import {Link,browserHistory} from 'react-router'

class PublicChordsPane extends React.Component{
  constructor(props) {
    super(props);
    this._delete=this._delete.bind(this)

  }

  _delete() {
    $.ajax({
        type: 'DELETE',
        url: 'https://lab5-akeech.c9users.io:8081/api/song/f/'+this.props.chord._id,
        data: {

        },
        dataType: 'json',
        success: function() {
          alert("Song Deleted, leave and come back to see changes")
          //browserHistory.push('/');
        }
    });

  }

  render() {
    const props = this.props
    return (

      <tr>
        <td>
          <Link to={'/view/'+props.chord._id } style={{textDecoration: 'none', color: '#757575'}}>{props.chord.title}</Link>
          {
            props.chord.author == localStorage.getItem("username")?
              <Link to={'/edit/'+props.chord._id } style={{textDecoration: 'none', color: '#757575'}}><Button style={{marginLeft:"20px"}}>Edit</Button></Link> :
              ""
          }
        </td>

        <td>{props.chord.author}
          {
            props.chord.author == localStorage.getItem("username")?
              <Button onClick={this._delete} bsStyle="danger" style={{marginLeft:"25px"}}>Delete</Button> :
              ""
          }

        </td>
      </tr>

)
  }
}
export default PublicChordsPane
