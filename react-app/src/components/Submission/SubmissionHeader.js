import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import {CardHeader, RaisedButton} from "material-ui";

const SubmissionHeader = (props) => {
  return (
    <Flexbox flexDirection='row' alignItems='flex-start' justifyContent='center-between'>
      <CardHeader
        avatar={props.imageSrc}
        title={props.title}
        subtitle={props.subtitle}
      />
      <Flexbox style={{marginLeft: 'auto', padding: '16px'}} justifyContent="center" height='100%'>
        <RaisedButton label="LISTEN" primary
                      onClick={() => window.location = this.link}/>
      </Flexbox>
    </Flexbox>

  );
};

SubmissionHeader.prototypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SubmissionHeader;