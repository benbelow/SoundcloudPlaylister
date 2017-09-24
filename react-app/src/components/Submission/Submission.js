import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {
  Card, CardActions, CardHeader, CardMedia, CardText, CardTitle, Checkbox, Divider, FlatButton, FontIcon,
  Paper
} from "material-ui";
import Formatter from "./Formatter";

const scLogoUrl = "https://images.vexels.com/media/users/3/137412/isolated/preview/1802b9d8ce3c819eebe90a86bbb61077-soundcloud-icon-logo-by-vexels.png";

class Submission extends Component {
  static propTypes = {
    comment: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  cardStyles = {
    display: "inline-block",
  };

  render() {
    const formatter = new Formatter(this.props.comment);
    const genre = formatter.genre();
    const link = formatter.markdownLink();

    const songTitle = formatter.title();
    if (typeof link === 'undefined' || !link) {

      return null;
    }
    return (
      <Card style={this.cardStyles}>
        <CardHeader
          title={songTitle}
          subtitle={this.props.author}
          avatar={scLogoUrl}
          actAsExpander
          showExpandableButton
        />
        <CardActions>
          <FlatButton label="LISTEN" onClick={() => window.location = formatter.link()}>
          </FlatButton>
          {/*<FlatButton label={this.props.author} />*/}
          <FlatButton label={genre}/>
        </CardActions>
        <Divider/>
        <CardText expandable>
          <ReactMarkdown source={formatter.description()}/>
          <Divider/>
          <Checkbox label="Themed" checked={formatter.themed()} disabled/>
        </CardText>
      </Card>
    )
  };
}

export default Submission;