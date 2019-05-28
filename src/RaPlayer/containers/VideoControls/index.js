import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import style from './index.scss';
import { actions } from '../../actions';
import {
  runPrefixMethod,
  getPrefixes,
  toHHMMSS,
  getElementOffset,
  getColorMap,
  isIE
} from '../../utils/core';
import { connect } from '../../utils/providerHelper';
import CommentBox from '../CommentBox';
import CommentHelperBox from '../CommentHelperBox';
import TimeBar from '../../components/TimeBar';
import VolumeBar from '../../components/VolumeBar';
import CommentBarDot from '../../components/CommentBarDot';
import TracksList from '../../components/TracksList';

let defaultControlOptions = {
  download: true,
  fullScreen: true,
  subtitles: false
};

class VideoControls extends Component {
  static propTypes = {
    onVideoPlayed: PropTypes.func,
    updateMediaAttributes: PropTypes.func,
    comments: PropTypes.array,
    isCommentBoxActive: PropTypes.bool,
    showCommentHelperBox: PropTypes.func,
    hideCommentHelperBox: PropTypes.func,
    hideCommentBox: PropTypes.func,
    showCommentBox: PropTypes.func,
    targetPlayerId: PropTypes.string,
    currentTime: PropTypes.number,
    commentBox: PropTypes.object,
    commentHelperBox: PropTypes.object,
    mediaState: PropTypes.oneOf(['PLAY', 'PAUSE']),
    edit: PropTypes.bool,
    volume: PropTypes.number,
    videoTracks: PropTypes.array,
    onSelectTrack: PropTypes.func,
    selectedTrack: PropTypes.number,
    onSeekHandler: PropTypes.func,
    volumeUpdateHandler: PropTypes.func,
    videoPauseAtTimeHandler: PropTypes.func,
    controlOptions: PropTypes.object,
    downloadSrc: PropTypes.string,
    videoDuration: PropTypes.number,
    commentBarClassName: PropTypes.string,
    videoControlsButtonsClassName: PropTypes.string,
    videoSeekBarClassName: PropTypes.string,
    disableComments: PropTypes.bool,
    toggleSubtitle: PropTypes.func.isRequired,
    disableSubtitles: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.showTrackList;
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.state = {
      showTrackList: false,
      subtitlesOn: false,
      subtitlesDisabled: false
    };
  }

  showTrackListHandler = () => {
    this.setState({
      showTrackList: true
    });
  };

  hideTrackListHandler = () => {
    this.setState({
      showTrackList: false
    });
  };

  togglePlayPause = () => {
    this.props.onVideoPlayed();
    if (this.props.mediaState === 'PLAY') {
      this.props.updateMediaAttributes({
        state: 'PAUSE'
      });
    } else {
      this.props.updateMediaAttributes({
        state: 'PLAY'
      });
    }
  };

  exitHandler() {
    const pfx = getPrefixes();
    let that = this;
    let parent = this.container.parentNode.parentNode;
    pfx.forEach(function(prefix) {
      parent.removeEventListener(
        prefix + 'fullscreenchange',
        that.exitHandler.bind(that)
      );
    });
  }

  toggleFullscreen = () => {
    const pfx = getPrefixes();
    let parent = this.container.parentNode.parentNode;
    var that = this;
    if (
      runPrefixMethod(document, 'FullScreen') ||
      runPrefixMethod(document, 'IsFullScreen')
    ) {
      runPrefixMethod(document, 'CancelFullScreen');
      this.props.updateMediaAttributes({ fullScreen: false });
      that.exitHandler();
    } else {
      this.props.updateMediaAttributes({ fullScreen: true });
      runPrefixMethod(parent, 'RequestFullScreen') ||
        runPrefixMethod(parent, 'RequestFullscreen');
      setTimeout(function() {
        pfx.forEach(function(prefix) {
          parent.addEventListener(
            prefix + 'fullscreenchange',
            that.exitHandler.bind(that),
            false
          );
        });
      }, 700);
    }
  };

  showCommentHelperBox = e => {
    /*
			200px: width of helper box
			8px: default left for down arrow
			10px: padding left and right of video controls
		*/
    if (this.props.isCommentBoxActive) {
      return;
    }
    let targetOffset = getElementOffset(e.target);
    let xPos = e.pageX - targetOffset.left;
    let percentage = (100 * xPos) / e.target.clientWidth;
    xPos -= 5;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    if (xPos < 0) {
      xPos = 0;
    }

    let time = (percentage / 100) * this.props.videoDuration;

    this.props.showCommentHelperBox({
      xPosRaw: xPos,
      time,
      clientWidth: e.target.clientWidth
    });
    this.props.hideCommentBox();
  };

  commentBarDotOnMouseInHandler = (e, comment) => {
    if (this.props.isCommentBoxActive) {
      return;
    }

    let style = window.getComputedStyle(e.target, null);
    let xPos = Number(parseFloat(style.getPropertyValue('left')).toFixed()) - 8;
    let targetElement = e.target.parentElement;
    let clientWidth = targetElement.clientWidth;

    this.props.hideCommentHelperBox();
    this.props.showCommentBox({
      xPosRaw: xPos,
      ...comment,
      readOnly: true,
      clientWidth
    });
  };

  commentBarDotOnMouseOutHandler = event => {
    if (this.props.isCommentBoxActive) {
      return;
    }
    var e = event.toElement || event.relatedTarget;
    if (this.container.contains(e)) {
      return;
    }
    this.props.hideCommentBox();
  };

  onMouseOutHandler = event => {
    if (this.props.isCommentBoxActive) {
      return;
    }
    var e = event.toElement || event.relatedTarget;
    if (this.container.contains(e)) {
      return;
    }
    this.props.hideCommentHelperBox();
    this.props.hideCommentBox();
  };

  toggleSubtitle = () => {
    let subtitlesOn = !this.state.subtitlesOn;
    // track(trackEvents.SUBTITLE_BUTTON_CLICKED, {
    // 	prev_state: subtitlesOn ? 'On' : 'Off',
    // 	next_state: subtitlesOn ? 'Off' : 'On'
    // });
    this.setState({ subtitlesOn: subtitlesOn }, () =>
      this.props.toggleSubtitle(subtitlesOn)
    );
  };
  componentDidMount() {
    const { controlOptions, toggleSubtitle, disableSubtitles } = this.props;
    let { subtitles: subtitlesOn } = {
      ...defaultControlOptions,
      ...controlOptions
    };
    const subtitlesDisabled = isIE() || !subtitlesOn ? true : false;
    this.setState(
      { subtitlesOn, subtitlesDisabled },
      () =>
        subtitlesDisabled ? disableSubtitles() : toggleSubtitle(subtitlesOn)
    );
  }

  render = () => {
    const {
      targetPlayerId,
      currentTime,
      commentBox,
      commentHelperBox,
      comments,
      mediaState,
      edit,
      volume = 0.5,
      videoTracks,
      onSelectTrack,
      selectedTrack,
      onSeekHandler,
      volumeUpdateHandler,
      videoPauseAtTimeHandler,
      controlOptions,
      downloadSrc,
      videoDuration,
      commentBarClassName,
      videoControlsButtonsClassName,
      videoSeekBarClassName,
      disableComments
    } = this.props;
    const { showTrackList, subtitlesOn, subtitlesDisabled } = this.state;
    this.video = document.getElementById(targetPlayerId);
    let controlOptionsProp = { ...defaultControlOptions, ...controlOptions };

    let currentTimeString = '00:00',
      seekTime = 0;
    if (videoDuration) {
      currentTimeString =
        !currentTime || currentTime === 0
          ? '00:00'
          : toHHMMSS(currentTime) + ' / ' + toHHMMSS(videoDuration);
      seekTime = (currentTime / videoDuration) * 100;
    }
    seekTime = seekTime ? seekTime - 0.01 : 0;
    let mediaPlayPauseKlass;
    switch (mediaState) {
      case 'PLAY':
        mediaPlayPauseKlass = style.pause;
        break;
      case 'PAUSE':
        mediaPlayPauseKlass = style.play;
        break;
    }

    let authors = comments.map(comment => comment.author.id);
    let colorMap = getColorMap(authors);

    let videoControlsStyle = {
      height: isIE() ? '60px' : '55px'
    };

    return (
      <div
        className={[style.videoControls].join(' ')}
        onMouseOut={this.onMouseOutHandler}
        ref={e => (this.container = e)}
        style={videoControlsStyle}
      >
        <TimeBar
          onMouseMove={this.showCommentHelperBox}
          seekTime={seekTime}
          onSeekHandler={onSeekHandler}
          className={videoSeekBarClassName}
        />

        <div
          className={cs(
            style.controlsButtonContainer,
            videoControlsButtonsClassName
          )}
        >
          <div className={style.playPauseButton}>
            <button
              style={{ border: 'none' }}
              type="button"
              className={[style.floatL, mediaPlayPauseKlass].join(' ')}
              onClick={this.togglePlayPause}
            />
          </div>

          <VolumeBar
            volumeUpdateHandler={volumeUpdateHandler}
            volume={volume}
          />
          <div
            className={[
              style.floatL,
              style.color99,
              style.F12,
              style.lineHeight20
            ].join(' ')}
            style={{ width: 'auto', marginTop: '1px' }}
          >
            {currentTimeString}
          </div>
          <div className={style.floatR}>
            {!subtitlesDisabled && (
              <div className={style.controlButton}>
                <div>
                  <button
                    style={{ border: 'none' }}
                    type="button"
                    className={style.subtitles}
                    onClick={this.toggleSubtitle}
                  />
                </div>
                <div
                  className={[
                    subtitlesOn ? style.subtitlesUnderline : null
                  ].join(' ')}
                />
              </div>
            )}
            {videoTracks &&
              videoTracks.length > 1 && (
                <div
                  className={style.controlButton}
                  onMouseEnter={this.showTrackListHandler}
                  onMouseLeave={this.hideTrackListHandler}
                >
                  <button
                    style={{ border: 'none' }}
                    type="button"
                    className={style.hd}
                  />
                  {showTrackList && (
                    <TracksList
                      tracks={videoTracks}
                      onSelect={onSelectTrack}
                      selectedTrack={selectedTrack}
                    />
                  )}
                </div>
              )}
            {controlOptionsProp.download &&
              downloadSrc && (
                <div className={style.controlButton}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ border: 'none' }}
                    href={downloadSrc}
                    download={downloadSrc}
                    className={style.download}
                  />
                </div>
              )}
            {controlOptionsProp.fullScreen && (
              <div className={style.controlButton}>
                <button
                  style={{ border: 'none' }}
                  type="button"
                  className={style.fullScreen}
                  onClick={this.toggleFullscreen}
                />
              </div>
            )}
          </div>
          <div className={style.clear} />
        </div>
        {!disableComments && (
          <React.Fragment>
            {commentBox.show ? <CommentBox edit={edit} /> : null}
            {commentHelperBox.show && edit ? (
              <CommentHelperBox
                targetPlayerId={targetPlayerId}
                onClickHandler={videoPauseAtTimeHandler}
              />
            ) : null}

            <CommentBarDot
              comments={comments}
              onMouseIn={this.commentBarDotOnMouseInHandler}
              onMouseOut={this.commentBarDotOnMouseOutHandler}
              targetPlayerId={targetPlayerId}
              colorMap={colorMap}
              videoDuration={videoDuration}
              commentBarClassName={commentBarClassName}
            />
          </React.Fragment>
        )}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    ...state,
    disableComments: state.disableComments,
    comments: state.comments,
    mediaState: state.media.state,
    videoDuration: state.media.duration,
    videoControlsButtonsClassName: state.videoControlsButtonsClassName,
    videoSeekBarClassName: state.videoSeekBarClassName,
    isCommentBoxActive:
      state.commentBox.show && !state.commentBox.data.readOnly,
    commentBarClassName: state.commentBarClassName
  };
}

export default connect(
  mapStateToProps,
  actions
)(VideoControls);
