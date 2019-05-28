import React, { Component } from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

export default class PhotoViewer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    height: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    height: 400
  };

  componentDidMount() {
    const width = this.containerRef.clientWidth;
    const height = this.containerRef.clientHeight;
    const containerBorderRadius = this.containerRef.style.borderRadius;
    const image = new Image();
    image.src = this.props.src;
    const self = this;
    image.onload = function() {
      let imageHeight = this.height;
      let imageWidth = this.width;
      if (imageHeight >= height) {
        imageHeight = height;
      }
      // maintaing aspect ratio for the given height
      const __width = (imageHeight * 16) / 9;
      if (__width > width) {
        imageWidth = width;
      } else {
        imageWidth = __width < imageWidth ? __width : imageWidth;
      }

      imageHeight = (imageWidth * 9) / 16;
      imageWidth += 'px';
      imageHeight += 'px';

      self.imageRef.setAttribute('src', self.props.src);
      self.imageRef.setAttribute(
        'style',
        `display: block;
      width: ${imageWidth};
      height: ${imageHeight};
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: ${containerBorderRadius ? containerBorderRadius : 0}
      `
      );
    };
  }

  render() {
    const { height, style } = this.props;
    const containerStyle = {
      ...style,
      width: '100%',
      minHeight: 'inherit',
      height,
      background: `${theme.colors.IVORY} `,
      position: 'relative'
    };

    return (
      <div style={containerStyle} ref={e => (this.containerRef = e)}>
        <img ref={e => (this.imageRef = e)} />
      </div>
    );
  }
}
