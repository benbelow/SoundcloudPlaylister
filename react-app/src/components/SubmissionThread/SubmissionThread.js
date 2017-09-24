import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, FlatButton, List, ListItem} from "material-ui";
import {description, theme, week} from "./ThreadHelpers";
import ReactMarkdown from 'react-markdown';
import {connect} from "react-redux";
import _ from "lodash";
import {fetchSubmissions} from "./SubmissionThreadActions";
import Submission from "../Submission/Submission";


class SubmissionThread extends Component {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    threadSubmissions: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.submissions = this.submissions.bind(this);
    this.fetchSubmissions = this.fetchSubmissions.bind(this);
  }

  submissions() {
    let currentSubmissions = _.filter(this.props.threadSubmissions, ts => this.props.thread.id === ts.threadId);
    let currentSubmission = _.first(currentSubmissions);
    // console.log(currentSubmission && currentSubmission.submissions);
    return currentSubmission && currentSubmission.submissions;
  }

  fetchSubmissions() {
    if (!this.submissions()) {
      this.props.fetchSubmissions(this.props.thread.id, this.props.thread.url)
    }
  }

  render() {
    const thread = this.props.thread;

    return (
      <Card
        onExpandChange={this.fetchSubmissions}
      >
        <CardHeader
          title={theme(thread)}
          subtitle={week(thread)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions/>
        <CardText expandable={true}>
          <ReactMarkdown source={description(thread)}/>
          {_.map(this.submissions(), s => {
            return <Submission author={s.author} comment={s.comment} />
          })}
        </CardText>
      </Card>
    );
  };
}

const mapStateToProps = state => {
  return {
    threadSubmissions: _.filter(state.submissionThread.threadSubmissions)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSubmissions: (id, url) => {
      dispatch(fetchSubmissions(id, url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionThread);