import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import { isJSON } from "../libs/utility.js";

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      frontOfCard: "",
      backOfCard: "",
      content: ""
    };
  }

  validateForm() {
    return (
      this.state.frontOfCard.length > 0
      &&
      this.state.backOfCard.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
  event.preventDefault();

  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
    return;
  }

  this.setState({ isLoading: true });

  try {
    const attachment = this.file
      ? await s3Upload(this.file)
      : null;

      let newVar = {};
      //this.state.content;
      newVar["front"] = this.state.frontOfCard;
      newVar["back"] = this.state.backOfCard;
      let newVarStringify = JSON.stringify(newVar);
      console.log("newvarstringify is ");
      console.log(newVarStringify);
      console.log("");

    await this.createNote({
      attachment,
      content: newVarStringify,
    });
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
}

createNote(note) {
  return API.post("notes", "/notes", {
    body: note
  });
}

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>

        <FormGroup controlId="frontOfCard">
          <FormControl
            onChange={this.handleChange}
            value={this.state.frontOfCard}
            componentClass="textarea"
          />
        </FormGroup>

        <FormGroup controlId="backOfCard">
          <FormControl
            onChange={this.handleChange}
            value={this.state.backOfCard}
            componentClass="textarea"
          />
        </FormGroup>

          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}