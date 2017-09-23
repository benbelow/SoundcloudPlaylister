import React, {Component} from "react";
import PropTypes from 'prop-types';
import {FlatButton} from "material-ui";
import {connect} from "react-redux";
import {fetchSubmissions} from "./PlaylistGeneratorActions";

class PlaylistGenerator extends Component {

  static propTypes = {
    targetUrl: PropTypes.string.isRequired,
  };

  render() {
    return (
      <FlatButton onClick={() => this.props.createPlaylist(this.props.targetUrl)}>
        Generate a playlist
      </FlatButton>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createPlaylist: url => {
      dispatch(fetchSubmissions(url));
    },
  };
};

export default connect(() => {return {}}, mapDispatchToProps)(PlaylistGenerator);