import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {Chip, Divider, Paper} from "material-ui";
import Formatter from "./Formatter";
import SubmissionHeader from "./SubmissionHeader";

const scLogoUrl = "https://images.vexels.com/media/users/3/137412/isolated/preview/1802b9d8ce3c819eebe90a86bbb61077-soundcloud-icon-logo-by-vexels.png";

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

class Submission extends Component {
  static propTypes = {
    comment: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isExpanded: false}
  }

  cardStyle = {};

  chipStyle = {
    margin: '8px',
  };

  chipContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  };

  render() {
    const formatter = new Formatter(this.props.comment);
    const genre = formatter.genre();
    const link = formatter.markdownLink();
    const description = formatter.description();

    const shouldShowChips = () => {
      return genre || themed;
    };

    const descriptionSection = () => {
      return (
        <div>
          <Divider/>
          <div style={{maxWidth: '350px', margin: 'auto'}}>
            <ReactMarkdown source={description}/>
          </div>
        </div>
      );
    };

    const chipSection = () => {
      return (
        <div>
          <Divider/>
          <div style={this.chipContainerStyle}>
            {genre ? <Chip style={this.chipStyle}> {genre} </Chip> : undefined}
            <Chip style={this.chipStyle}> {themed ? 'Themed' : 'Not Themed'} </Chip>
          </div>
        </div>
      );
    };

    const themed = formatter.themed();
    const songTitle = formatter.title();

    if (typeof link === 'undefined' || !link) {
      return null;
    }
    return (
      <Paper style={this.cardStyle}>
        <SubmissionHeader
          style={{position: 'absolute'}}
          title={songTitle}
          subtitle={this.props.author}
          imageSrc={scLogoUrl}
          link={formatter.link()}
          onExpand={() => this.setState({isExpanded: !this.state.isExpanded})}
          canExpand={!isEmptyOrSpaces(description)}
        />
        {this.state.isExpanded ? descriptionSection() : undefined}
        {shouldShowChips() ? chipSection() : undefined}
      </Paper>
    )
  };
}

export default Submission;