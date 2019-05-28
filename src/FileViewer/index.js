import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  PdfPlayer,
  RaPlayer,
  PhotoViewer,
  UnsupportedViewer,
  ZipViewer
} from './drivers';

const COMMON_PROPS = ['style', 'title', 'src'];

const DRIVER_MAP = {
  PDF: {
    types: ['pdf'],
    props: ['uuid', 'src']
  },
  IMAGE: {
    types: ['jpg', 'jpeg', 'gif', 'bmp', 'png'],
    props: ['height', 'src']
  },
  VIDEO: {
    types: ['mp3', 'mp4', 'webm'],
    props: ['src', 'primaryTracks', 'secondaryTracks']
  },
  ZIP: {
    types: ['zip'],
    props: ['src', 'title']
  }
};

const isPDF = type => {
  return DRIVER_MAP.PDF.types.includes(type);
};

const isImage = type => {
  return DRIVER_MAP.IMAGE.types.includes(type);
};

const isVideo = type => {
  return DRIVER_MAP.VIDEO.types.includes(type);
};

const isZip = type => {
  return DRIVER_MAP.ZIP.types.includes(type);
};

class FileViewer extends Component {
  getType = () => {
    const { type: passedType, src = '' } = this.props;
    const type =
      passedType ||
      src
        .split('.')
        .pop()
        .split(/#|\?/)[0];

    return type;
  };
  getDriver() {
    const type = this.getType();
    if (isImage(type)) {
      return PhotoViewer;
    } else if (isVideo(type)) {
      return RaPlayer;
    } else if (isPDF(type)) {
      return PdfPlayer;
    } else if (isZip(type)) {
      return ZipViewer;
    } else {
      return UnsupportedViewer;
    }
  }

  getDriverProps = () => {
    const type = this.getType();
    let props = {};
    COMMON_PROPS.forEach(p => (props[p] = this.props[p]));
    if (isImage(type)) {
      DRIVER_MAP.IMAGE.props.forEach(p => (props[p] = this.props[p]));
    } else if (isVideo(type)) {
      DRIVER_MAP.VIDEO.props.forEach(p => (props[p] = this.props[p]));
      props.edit = false;
      if (!this.props.primaryTracks && this.props.src) {
        props.primaryTracks = [
          {
            src: this.props.src
          }
        ];
      }
    } else if (isPDF(type)) {
      DRIVER_MAP.PDF.props.forEach(p => (props[p] = this.props[p]));
    } else if (isZip(type)) {
      DRIVER_MAP.ZIP.props.forEach(p => (props[p] = this.props[p]));
    }
    return props;
  };

  render() {
    const Driver = this.getDriver();
    const driveProps = this.getDriverProps();
    return <Driver {...driveProps} />;
  }
}

FileViewer.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string,
  primaryTracks: PropTypes.array
};

export default FileViewer;
