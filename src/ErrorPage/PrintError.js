import React from 'react';
import PropTypes from 'prop-types';

const PrintError = ({ error, errorInfo }) => {
  return (
    <pre
      style={{
        color: 'white',
        fontSize: '16px',
        backgroundColor: '#d20000cc'
      }}
    >
      {error.stack}
      <br />
      {errorInfo.componentStack}
    </pre>
  );
};

PrintError.propTypes = {
  error: PropTypes.object.isRequired,
  errorInfo: PropTypes.object
};

PrintError.defaultProps = {
  errorInfo: {}
};

export default PrintError;
