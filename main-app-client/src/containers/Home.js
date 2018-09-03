import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
//      notes: []
    };
  }

  async componentDidMount() {
  if (!this.props.isAuthenticated) {
    return;
  }

/*
  try {
    const notes = await this.notes();
    this.setState({ notes });
  } catch (e) {
    alert(e);
  }
  */

  this.setState({ isLoading: false });
}
/*
notes() {
  return API.get("notes", "/notes");
}

renderNotesList(notes) {
return [{}].concat(notes).map(
  (note, i) =>
    i !== 0
      ? <ListGroupItem
          key={note.noteId}
          href={`/notes/${note.noteId}`}
          onClick={this.handleNoteClick}
          header={note.content.trim().split("\n")[0]}
        >
          {"Created: " + new Date(note.createdAt).toLocaleString()}
        </ListGroupItem>
      : <ListGroupItem
          key="new"
          href="/notes/new"
          onClick={this.handleNoteClick}
        >
          <h4>
            <b>{"\uFF0B"}</b> Create a new note
          </h4>
        </ListGroupItem>
);
}

handleNoteClick = event => {
event.preventDefault();
this.props.history.push(event.currentTarget.getAttribute("href"));
}
*/

renderLander() {
return (
  <div className="lander">
    <h1>Home</h1>
    <p>Hello! Please log in.</p>
    <div>
      <Link to="/login" className="btn btn-info btn-lg">
        Login
      </Link>
      <Link to="/signup" className="btn btn-success btn-lg">
        Signup
      </Link>
    </div>
  </div>
);
}

/*
  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }
  */

  renderHub() {
    return (
      <div className="landing">
        <PageHeader>Links</PageHeader>
        <div>
        <div>
        <Link to="/gameHub">
          Game!
        </Link>
        </div>
        <div>
          <Link to="/noteHub">
            Notes!
          </Link>
        </div>
        </div>


      </div>
    );
  }
  /*
  <ListGroup>
    {!this.state.isLoading && this.renderNotesList(this.state.notes)}
  </ListGroup>
*/


  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderHub() : this.renderLander()}
      </div>
    );
  }
}
