import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.scss';
import { isIE } from '../../utils/core';

class VolumeBar extends Component {
  static propTypes = {
    volume: PropTypes.number,
    volumeUpdateHandler: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.setVideoVolume = this.setVideoVolume.bind(this);
    this.mute = this.mute.bind(this);
    let initialState = {
      volume: props.volume
    };
    this.state = initialState;
  }

  mute() {
    let volume = 0;
    if (!this.state.volume) {
      volume = 0.5;
    }
    this.setState({
      volume
    });
    this.props.volumeUpdateHandler(volume);
  }

  setVideoVolume() {
    let volume = this.volumeBar.value;
    this.setState({
      volume
    });
    this.props.volumeUpdateHandler(volume);
  }

  attachEvent() {
    this.volumeBar.addEventListener('change', this.setVideoVolume.bind(this));
    this.volumeBar.addEventListener('input', this.setVideoVolume.bind(this));
  }

  componentDidMount() {
    this.attachEvent();
  }

  render() {
    const { volume } = this.state;
    let volumeKlass = style.volume;
    if (!volume) {
      volumeKlass = style.mute;
    }
    let volumeBarStyle = {
      height: !isIE() ? '4px' : 'auto',
      top: isIE() ? '-4px' : '8px',
      background: isIE() ? 'transparent' : '#fff'
    };
    // let parentStyle = {
    // 	top: !isIE() ? '8px': '-4px'
    // };
    return (
      <div className={style.soundContainer}>
        <button
          style={{ border: 'none' }}
          type="button"
          className={[style.floatL, volumeKlass, style.marginR12].join(' ')}
          onClick={this.mute}
        />
        <div className={style.volumeBarParent}>
          <input
            type="range"
            className={[style.volumeBar, style.rangeBar].join(' ')}
            ref={e => (this.volumeBar = e)}
            min="0"
            max="1"
            step="0.1"
            defaultValue={volume}
            style={volumeBarStyle}
          />
        </div>
      </div>
    );
  }
}

export default VolumeBar;
