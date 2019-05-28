import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.scss';
import Draggable from '../../components/Draggable/index';
import Video from '../../components/Video/index';
import classnames from 'classnames';

class Player extends Component {
  static propTypes = {
    onVideoPlayed: PropTypes.func,
    onVideoLoaded: PropTypes.func,
    hidemedia: PropTypes.bool,
    id: PropTypes.string,
    secondaryId: PropTypes.string,
    src: PropTypes.string,
    secondarySrc: PropTypes.string,
    updateMediaAttributes: PropTypes.func,
    onRenderComplete: PropTypes.func,
    currentTime: PropTypes.number,
    mediaState: PropTypes.oneOf(['PLAY', 'PAUSE']),
    onVideoTimeUpdate: PropTypes.func,
    onVideoEnded: PropTypes.func,
    subtitleTrackSrc: PropTypes.string
  };

  pause() {
    this.video.pause();
    if (this.videoInset) {
      this.videoInset.pause();
    }
  }

  play() {
    this.video.play();
    if (this.videoInset) {
      this.videoInset.play();
    }
  }

  getCurrentTime() {
    return this.video.getCurrentTime();
  }

  unbind() {
    this.video.unbind();
    if (this.videoInset) {
      this.videoInset.unbind();
    }
  }

  pauseAtTime(time) {
    this.video.moveToTime(time);
    this.video.pause();
    if (this.videoInset) {
      this.videoInset.moveToTime(time);
      this.videoInset.pause();
    }
  }

  togglePlayPause = () => {
    this.props.onVideoPlayed();
    if (!this.video.isPaused()) {
      this.video.pause();
      if (this.videoInset) {
        this.videoInset.pause();
      }
    } else {
      this.video.play();
      if (this.videoInset) {
        this.videoInset.play();
      }
    }
  };

  moveTo(value) {
    var time = this.video.getDuration() * value;
    this.video.moveToTime(time);
    if (this.videoInset) {
      this.videoInset.moveToTime(time);
    }
  }

  seekToTime(time) {
    this.video.moveToTime(time);
    if (this.videoInset) {
      this.videoInset.moveToTime(time);
    }
  }

  updateVolume(volume) {
    this.video.setVolume(volume);
  }

  onVideoLoadedHandler = () => {
    this.props.onVideoLoaded();
    if (this.props.hidemedia) {
      return;
    }
  };

  isPaused() {
    return this.video.isPaused();
  }

  onVideoEndedHandler = () => {
    this.props.onVideoLoaded();
    this.props.onVideoEnded();
    if (this.props.hidemedia) {
      return;
    }
  };

  toggleSubtitle = subtitlesOn => {
    return this.video.toggleSubtitle(subtitlesOn);
  };

  disableSubtitles = () => {
    return this.video.disableSubtitles();
  };

  render() {
    const {
      id,
      secondaryId,
      src,
      secondarySrc,
      updateMediaAttributes,
      onRenderComplete,
      hidemedia,
      currentTime,
      mediaState,
      onVideoTimeUpdate,
      subtitleTrackSrc
    } = this.props;
    const className = classnames(style.playerContainer, {
      [style.hide]: false //hidemedia
    });

    return (
      <div onClick={this.togglePlayPause} className={className}>
        <Video
          src={src}
          updateMediaAttributes={updateMediaAttributes}
          ref={e => (this.video = e)}
          currentTime={currentTime}
          id={id}
          hidemedia={hidemedia}
          mediaState={mediaState}
          disableToggle="true"
          onVideoLoaded={this.onVideoLoadedHandler}
          onVideoEnded={this.onVideoEndedHandler}
          onRenderComplete={onRenderComplete}
          onVideoTimeUpdate={onVideoTimeUpdate}
          subtitleTrackSrc={subtitleTrackSrc}
        />
        {secondarySrc && (
          <Draggable>
            <div style={{ width: '140px', height: '79px' }}>
              <Video
                ref={e => (this.videoInset = e)}
                src={secondarySrc}
                currentTime={currentTime}
                id={secondaryId}
                disableToggle="true"
                mute="true"
                heightAuto="true"
              />
            </div>
          </Draggable>
        )}
      </div>
    );
  }
}

export default Player;
