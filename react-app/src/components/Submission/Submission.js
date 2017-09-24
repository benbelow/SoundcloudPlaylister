import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {Checkbox, Paper} from "material-ui";
import Formatter from "./Formatter";

class Submission extends Component {
  static propTypes = {
    comment: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  render() {
    const formatter = new Formatter(this.props.comment);
    const genre = formatter.genre();
    const link = formatter.link();

    if (typeof link === 'undefined' || !link) {
      return null;
    }

    return (
      <Paper>
        <ReactMarkdown source={link}/>
        <p> <b>{this.props.author} </b></p>
        {genre ? <p> <i>Genre: {genre}</i> </p> : undefined}
        <ReactMarkdown source={formatter.description()}/>
        <Checkbox label="Themed" checked={formatter.themed()} disabled/>
      </Paper>
    )
  };
}

export default Submission;