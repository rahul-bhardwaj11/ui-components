import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.scss';
import { isIE } from '../../utils/core';

class TimeBar extends Component {
  static propTypes = {
    onSeekHandler: PropTypes.func,
    seekTime: PropTypes.number,
    onMouseMove: PropTypes.func,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.setVideoTime = this.setVideoTime.bind(this);
  }

  setVideoTime() {
    if (this.seekBar) {
      this.props.onSeekHandler(parseInt(this.seekBar.value) / 100);
    }
  }

  attachEvent() {
    this.seekBar.addEventListener('input', this.setVideoTime.bind(this));
    this.seekBar.addEventListener('change', this.setVideoTime.bind(this));
  }

  componentDidMount() {
    this.attachEvent();
  }

  render() {
    const { seekTime, onMouseMove, className } = this.props;
    let containerHeight = isIE() ? 15 : 4;
    let seekBarStyle = {
        backgroundImage: !isIE()
          ? `-webkit-gradient(linear, left top, right top, color-stop(${seekTime /
              100}, #ff8a16), color-stop(${seekTime / 100}, #ffffff))`
          : null,
        height: !isIE() ? '100%' : 'auto'
      },
      containerStyle = {
        height: containerHeight + 'px'
      };
    return (
      <div style={containerStyle} className={style.container}>
        <input
          type="range"
          ref={e => (this.seekBar = e)}
          value={seekTime}
          readOnly
          min="0"
          max="100"
          step="0.01"
          className={[
            style.marginR12,
            style.marginT14,
            style.rangeBar,
            className
          ].join(' ')}
          onMouseMove={onMouseMove}
          style={seekBarStyle}
        />
      </div>
    );
  }
}

export default TimeBar;
