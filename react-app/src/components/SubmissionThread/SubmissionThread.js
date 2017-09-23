import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader} from "material-ui";
import {theme} from "./ThreadHelpers";

class SubmissionThread extends Component {
  static propTypes = {
    thread: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Card>
        <CardHeader title={theme(this.props.thread)}/>
      </Card>
    );
  };
}

export default SubmissionThread;