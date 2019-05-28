import React from 'react';
import PropTypes from 'prop-types';

class StringToHTML extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    let { content, className } = this.props;
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

export default StringToHTML;
