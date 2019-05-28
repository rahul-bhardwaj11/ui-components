import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import { FileIconPreview } from '../css';

class UnsupportedViewer extends Component {
  render() {
    const { title, src } = this.props;
    return (
      <FileIconPreview>
        <a href={src} className="fileName">
          {title}
        </a>
        <Icon type="media" className="Icon" />
      </FileIconPreview>
    );
  }
}

UnsupportedViewer.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string
};

export default UnsupportedViewer;
