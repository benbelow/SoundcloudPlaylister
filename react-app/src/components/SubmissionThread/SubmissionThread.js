import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardActions, CardHeader, CardText, Divider, FlatButton, GridList, GridTile, List,
  ListItem
} from "material-ui";
import Flexbox from 'flexbox-react';
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

  cardStyle = {
    margin: 16,
  };

  flexboxStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    alignContent: 'stretch'
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
        style={this.cardStyle}
        onExpandChange={this.fetchSubmissions}
      >
        <CardHeader
          title={theme(thread)}
          subtitle={week(thread)}
          actAsExpander
          showExpandableButton
        />
        <CardActions/>
        <Divider/>
        <CardText expandable>
          <ReactMarkdown source={description(thread)}/>

          <Flexbox style={this.flexboxStyle}
                   flexDirection="row"
                   flexWrap="wrap"
                   flexBasis='content'
          >
            {_.map(this.submissions(), (s, i) => {
              return <Flexbox margin="8px"> <Submission key={s.author + i} author={s.author} comment={s.comment}/></Flexbox>
            })}
          </Flexbox>

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