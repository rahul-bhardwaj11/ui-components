import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Scrollbar from 'react-custom-scrollbars';
import cs from 'classnames';
import css from 'dom-css';

import themes from '../styles/theme';

const ScrollbarStyle = styled.div`
  .trackVertical {
    width: 4px !important;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
  }

  .thumbVertical {
    width: 100%;
    background-color: ${themes.colors.GREY};
    border-radius: 4px;
  }
`;

class CustomScrollbar extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.borderTopRef = React.createRef();
    this.shadowBottom = React.createRef();
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const borderTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    if (this.borderTopRef && this.borderTopRef.current) {
      css(this.borderTopRef.current, { opacity: borderTopOpacity });
    }
    if (this.shadowBottomRef && this.shadowBottomRef.current) {
      css(this.shadowBottomRef.current, { opacity: shadowBottomOpacity });
    }
  }

  static propTypes = {
    classNames: PropTypes.shape({
      track: PropTypes.string,
      thumb: PropTypes.string,
      wrapper: PropTypes.string,
      top: PropTypes.string,
      bottom: PropTypes.string
    }),
    style: PropTypes.object,
    showShadow: PropTypes.bool
  };

  static defaultProps = {
    classNames: {},
    showShadow: false
  };

  render() {
    const { classNames, style, showShadow, ...rest } = this.props;

    return (
      <ScrollbarStyle className={classNames.wrapper} style={style}>
        <Scrollbar
          onUpdate={this.handleUpdate}
          renderTrackVertical={props => (
            <div {...props} className={cs('trackVertical', classNames.track)} />
          )}
          renderThumbVertical={props => (
            <div {...props} className={cs('thumbVertical', classNames.thumb)} />
          )}
          {...rest}
        />
        <div
          ref={this.borderTopRef}
          className={cs('borderTopStyle', classNames.top)}
        />
        <div
          ref={this.shadowBottomRef}
          className={cs(showShadow && 'shadowTopStyle', classNames.bottom)}
        />
      </ScrollbarStyle>
    );
  }
}

export default CustomScrollbar;
