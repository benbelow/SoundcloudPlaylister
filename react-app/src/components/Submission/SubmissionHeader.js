import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import {CardHeader, RaisedButton} from "material-ui";

const SubmissionHeader = (props) => {
  const buttonStyle = {marginLeft: '4px', marginRight: '4px'};
  return (
    <Flexbox flexDirection='row' alignItems='flex-start'>
      <CardHeader
        style={{textAlign: 'left'}}
        avatar={props.imageSrc}
        title={props.title}
        subtitle={props.subtitle}
      />
      <Flexbox style={{margin: 'auto', padding: '8px'}} justifyContent="center" height='100%'>
        <RaisedButton
          style={buttonStyle}
          label="LISTEN"
          primary
          onClick={() => window.location = this.link}
        />
        <RaisedButton
          style={buttonStyle}
          label="MORE"
          secondary
          onClick={props.onExpand}
        />
      </Flexbox>
    </Flexbox>

  );
};

SubmissionHeader.prototypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onExpand: PropTypes.func.isRequired
};

export default SubmissionHeader;