import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import { FileIconPreview } from '../css';

class ZipViewer extends Component {
  render() {
    const { title, src } = this.props;
    return (
      <FileIconPreview>
        <a href={src} className="fileName">
          {title}
        </a>
        <Icon type="zip" className="Icon" />
      </FileIconPreview>
    );
  }
}

ZipViewer.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string
};

export default ZipViewer;
