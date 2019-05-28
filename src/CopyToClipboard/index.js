import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import classnames from "classnames";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copy from 'copy-to-clipboard';

export default class CopyToClip extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onCopy: PropTypes.func,
    children: PropTypes.node
  };

  static copy = ({ text, options, onCopy }) => {
    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }
  };

  render() {
    const { text, onCopy, children } = this.props;
    return (
      <CopyToClipboard text={text} onCopy={onCopy}>
        {children}
      </CopyToClipboard>
    );
  }
}
