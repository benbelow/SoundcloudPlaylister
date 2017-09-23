import React, {Component} from 'react';
import {Card, CardHeader} from "material-ui";
import {connect} from "react-redux";

class SubmissionThread extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Submissions Thread"/>
      </Card>
    );
  };
}

const mapStateToProps = state => {
  return {
    submissionThreads: state.threads.submissionThreads,
  }
};

export default connect()(SubmissionThread);