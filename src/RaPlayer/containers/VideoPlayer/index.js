import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actions } from '../../actions';
import { connect } from '../../utils/providerHelper';
import style from './index.scss';
import Player from '../../components/Player';
import VideoControls from '../VideoControls';
import cs from 'classnames';
import { getOptimizedTrack } from '../../utils/core';

let showControls = Symbol('showControls');
let hideControls = Symbol('hideControls');
let onSelectTrack = Symbol('onSelectTrack');
let onSeekHandler = Symbol('onSeekHandler');
let volumeUpdateHandler = Symbol('volumeUpdateHandler');
let onVideoLoadedHandler = Symbol('onVideoLoadedHandler');
let onVideoEndedHandler = Symbol('onVideoEndedHandler');
let onVideoPlayedHandler = Symbol('onVideoPlayedHandler');
let videoPauseAtTimeHandler = Symbol('videoPauseAtTimeHandler');
let updateMediaAttributes = Symbol('updateMediaAttributes');
let togglePlayPause = Symbol('togglePlayPause');
let toggleSubtitle = Symbol('togglePlayPause');
let videoPlayer = Symbol('videoPlayer');
let container = Symbol('container');
let disableSubtitles = Symbol('disableSubtitles');

class VideoPlayerContainer extends Component {
  static propTypes = {
    updateMediaAttributes: PropTypes.func,
    selectedTrack: PropTypes.number,
    currentTime: PropTypes.number,
    primaryTracks: PropTypes.array.isRequired,
    secondaryTracks: PropTypes.array,
    fullScreen: PropTypes.bool,
    edit: PropTypes.bool,
    id: PropTypes.string,
    secondaryId: PropTypes.string,
    onRenderComplete: PropTypes.func,
    showControlsOnly: PropTypes.bool,
    controlOptions: PropTypes.object,
    downloadSrc: PropTypes.bool,
    mediaState: PropTypes.string,
    videoControlsClassName: PropTypes.string,
    className: PropTypes.string,
    onVideoTimeUpdate: PropTypes.func,
    onVideoEnded: PropTypes.func,
    subtitleTrackSrc: PropTypes.string
  };

  static defaultProps = {
    onVideoEnded: () => {}
  };

  [updateMediaAttributes] = this.props.updateMediaAttributes.bind(this.props);

  constructor(props) {
    super(props);
    this.state = {
      selectedTrack: getOptimizedTrack(this.props.primaryTracks)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTrack !== nextProps.selectedTrack) {
      this.setState({
        selectedTrack: nextProps.selectedTrack
      });
    }
  }

  // Public Methods
  getCurrentTime = () => {
    return this[videoPlayer].getCurrentTime();
  };

  play = () => {
    this[videoPlayer].play();
  };

  pause = () => {
    this[videoPlayer].pause();
  };

  seekToTime = time => {
    this[videoPlayer].seekToTime(time);
  };

  [togglePlayPause] = () => {
    if (this[videoPlayer]) {
      this[videoPlayer].togglePlayPause();
    }
  };

  [showControls] = () => {
    this.setState({
      controls: true
    });
  };

  [hideControls] = event => {
    var e = event.toElement || event.relatedTarget;
    if (this[container].contains(e)) {
      return;
    }
    this.setState({
      controls: false
    });
  };

  [onSelectTrack] = selectedTrack => {
    let currentTime = this.props.currentTime;
    let isPaused = this[videoPlayer].isPaused();
    this.setState({
      selectedTrack
    });
    setTimeout(() => {
      this[videoPlayer].seekToTime(currentTime);
      if (!isPaused) {
        this[videoPlayer].play();
        this.setState({
          showPlayButton: false
        });
      }
    }, 500);
  };

  [onSeekHandler] = seekbarValue => {
    this[videoPlayer].moveTo(seekbarValue);
  };

  [volumeUpdateHandler] = volume => {
    this[videoPlayer].updateVolume(volume);
  };

  [onVideoLoadedHandler] = () => {
    let showPlayButton = this[videoPlayer].isPaused();
    this.setState({
      showPlayButton,
      controls: false
    });
  };

  [onVideoEndedHandler] = () => {
    this.props.onVideoEnded();
    this.setState({
      showPlayButton: true,
      controls: false
    });
  };

  [onVideoPlayedHandler] = () => {
    this.setState({
      showPlayButton: false,
      controls: true
    });
  };

  [videoPauseAtTimeHandler] = time => {
    this[videoPlayer].pauseAtTime(time);
  };

  [toggleSubtitle] = subtitlesOn => {
    this[videoPlayer].toggleSubtitle(subtitlesOn);
  };
  [disableSubtitles] = () => {
    this[videoPlayer].disableSubtitles();
  };

  render = () => {
    const {
      primaryTracks,
      secondaryTracks,
      fullScreen,
      edit,
      id,
      secondaryId,
      onRenderComplete,
      showControlsOnly,
      controlOptions,
      downloadSrc,
      currentTime,
      mediaState,
      className,
      videoControlsClassName,
      onVideoTimeUpdate,
      subtitleTrackSrc
    } = this.props;
    let { controls, selectedTrack, showPlayButton } = this.state;
    controls = showControlsOnly || controls;
    let downloadSrcLink = primaryTracks[selectedTrack].src;
    if (showControlsOnly) {
      downloadSrcLink = downloadSrc ? downloadSrc : undefined;
    }
    return (
      <div
        ref={e => (this[container] = e)}
        className={[
          style.videoContainer,
          style.posRel,
          fullScreen ? style.fullScreen : '',
          showControlsOnly ? style.showControlsOnly : '',
          className
        ].join(' ')}
        onMouseEnter={this[showControls]}
        onMouseLeave={this[hideControls]}
      >
        {showPlayButton &&
          !showControlsOnly && (
            <div className={style.play} onClick={this[togglePlayPause]} />
          )}
        <Player
          ref={e => (this[videoPlayer] = e)}
          src={primaryTracks[selectedTrack].src}
          secondarySrc={
            secondaryTracks && secondaryTracks[0] && secondaryTracks[0].src
          }
          updateMediaAttributes={this[updateMediaAttributes]}
          onVideoLoaded={this[onVideoLoadedHandler]}
          onVideoEnded={this[onVideoEndedHandler]}
          onVideoPlayed={this[onVideoPlayedHandler]}
          onRenderComplete={onRenderComplete}
          onVideoTimeUpdate={onVideoTimeUpdate}
          hidemedia={showControlsOnly}
          currentTime={currentTime}
          id={id}
          secondaryId={secondaryId}
          mediaState={mediaState}
          subtitleTrackSrc={subtitleTrackSrc}
        />

        <div
          className={cs(videoControlsClassName, style.videoControls, {
            [style.showControls]: controls,
            [style.hideControls]: !controls
          })}
        >
          <VideoControls
            edit={edit}
            targetPlayerId={id}
            videoTracks={primaryTracks}
            downloadSrc={downloadSrcLink}
            selectedTrack={selectedTrack}
            onSelectTrack={this[onSelectTrack]}
            onVideoPlayed={this[onVideoPlayedHandler]}
            onSeekHandler={this[onSeekHandler]}
            volumeUpdateHandler={this[volumeUpdateHandler]}
            videoPauseAtTimeHandler={this[videoPauseAtTimeHandler]}
            controlOptions={controlOptions}
            currentTime={currentTime}
            toggleSubtitle={this[toggleSubtitle]}
            disableSubtitles={this[disableSubtitles]}
          />
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    fullScreen: state.media.fullScreen,
    currentTime: state.media.currentTime,
    mediaState: state.media.state,
    selectedTrack: state.selectedTrack,
    videoControlsClassName: state.videoControlsClassName
  };
}

export default connect(
  mapStateToProps,
  actions
)(VideoPlayerContainer);
