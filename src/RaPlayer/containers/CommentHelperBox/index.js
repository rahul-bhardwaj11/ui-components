import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { actions } from '../../actions';
import { toHHMMSS } from '../../utils/core';
import { connect } from '../../utils/providerHelper';
import style from './index.scss';

class CommentHelperBox extends Component {
  static propTypes = {
    commentBoxHelperRenderer: PropTypes.func,
    targetPlayerId: PropTypes.string,
    xPosRaw: PropTypes.number,
    time: PropTypes.number,
    downArrowXPos: PropTypes.number,
    hideCommentBox: PropTypes.func,
    showCommentBox: PropTypes.func,
    hideCommentHelperBox: PropTypes.func,
    onClickHandler: PropTypes.func,
    postComment: PropTypes.func,
    videoWidth: PropTypes.number,
    clientWidth: PropTypes.number,
    comments: PropTypes.array
  };

  state = {
    xPos: null,
    downArrowXPos: null
  };

  isCommentBarDotWithin(time) {
    var isWithin = false;
    this.props.comments.forEach(comment => {
      if (parseInt(comment.time) === parseInt(time)) {
        isWithin = true;
      }
    });
    return isWithin;
  }

  ref = commentBox => {
    if (commentBox) {
      this.commentBox = commentBox;
      this.calculateXPos();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.time !== this.props.time) {
      this.calculateXPos();
    }
  }

  calculateXPos = () => {
    const commentBox = this.commentBox;
    const width = commentBox.getBoundingClientRect().width;
    let { xPosRaw, time, clientWidth } = this.props;
    let availableWindowForCommentHelperBox = xPosRaw + width / 2,
      upperXLimit = clientWidth,
      downArrowXPos;
    downArrowXPos = width / 2;

    if (this.isCommentBarDotWithin(time)) {
      return;
    }
    xPosRaw -= width / 2;
    if (availableWindowForCommentHelperBox > upperXLimit) {
      xPosRaw = clientWidth - width;
      downArrowXPos =
        availableWindowForCommentHelperBox - upperXLimit + width / 2;
    }

    if (xPosRaw < 0) {
      downArrowXPos = xPosRaw + width / 2;
      xPosRaw = 0;
    }

    downArrowXPos = downArrowXPos < 10 ? 10 : downArrowXPos;
    downArrowXPos = downArrowXPos > width - 20 ? width - 20 : downArrowXPos;
    this.setState({
      xPos: xPosRaw,
      downArrowXPos,
      selfWidth: width
    });
  };

  commentHelperBoxClickHandler = () => {
    /*
			300px: width of comment box
			8px: default left for down arrow
		*/

    let { time, xPosRaw } = this.props;
    let { downArrowXPos } = this.state;
    let clientWidth = this.props.videoWidth - 20;

    this.props.hideCommentBox();
    this.props.showCommentBox({
      xPosRaw: xPosRaw - 5,
      time: time,
      clientWidth,
      downArrowXPosRaw: downArrowXPos
    });
    this.props.hideCommentHelperBox();
    if (typeof this.props.onClickHandler === 'function') {
      this.props.onClickHandler(time);
    }
  };

  emojiOnSelectHandler = selectedEmoji => {
    this.props.postComment({
      time: this.props.time,
      text: selectedEmoji
    });
  };

  render() {
    const { time, commentBoxHelperRenderer } = this.props;
    const { xPos, downArrowXPos } = this.state;
    const divCls = cs(style.boxWrapper, {
      [style.hide]: xPos === null
    });
    let divStyle = {
      left: xPos
    };
    let timestampReadable = time ? toHHMMSS(time) : '00:00';
    let downArrowStyle;
    if (downArrowXPos) {
      downArrowStyle = {
        left: downArrowXPos + 'px'
      };
    }
    return (
      <div style={divStyle} className={divCls}>
        {commentBoxHelperRenderer({
          emojiOnSelectHandler: this.emojiOnSelectHandler,
          timestampReadable,
          commentHelperBoxClickHandler: this.commentHelperBoxClickHandler,
          downArrowStyle,
          boxRef: this.ref
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    xPosRaw: state.commentHelperBox.data.xPosRaw,
    clientWidth: state.commentHelperBox.data.clientWidth,
    time: state.commentHelperBox.data.time,
    videoWidth: state.media.videoWidth,
    videoDuration: state.media.duration,
    postComment: state.postComment,
    comments: state.comments,
    commentBoxHelperRenderer: state.commentBoxHelperRenderer
  };
}

export default connect(
  mapStateToProps,
  actions
)(CommentHelperBox);
