import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from "material-ui";

class Submission extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired
  };

  render() {
    return (
      <List>
        <ListItem
          primaryText={this.props.link}
        />
      </List>
    )
  };
}

export default Submission;