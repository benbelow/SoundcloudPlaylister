import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, FlatButton, List, ListItem} from "material-ui";
import {description, theme, week} from "./ThreadHelpers";
import ReactMarkdown from 'react-markdown';
import {connect} from "react-redux";
import _ from "lodash";
import {fetchSubmissions} from "./SubmissionThreadActions";


class SubmissionThread extends Component {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    threadSubmissions: PropTypes.array,
  };

  submissions() {
    let currentSubmissions = _.filter(this.props.threadSubmissions, ts => this.props.thread.id === ts.threadId);
    let currentSubmission = _.first(currentSubmissions);
    console.log(currentSubmission);
    return currentSubmission && currentSubmission.submissions;
  }

  render() {
    const thread = this.props.thread;

    return (
      <Card>
        <CardHeader
          title={theme(thread)}
          subtitle={week(thread)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions/>
        <CardText expandable={true}>
          <ReactMarkdown source={description(thread)}/>
          <FlatButton onClick={() => this.props.fetchSubmissions(thread.id, thread.url)}>Fetch Tracks</FlatButton>
          <List>
            {_.map(this.submissions(), s => <ListItem>{s}</ListItem>)}
          </List>

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