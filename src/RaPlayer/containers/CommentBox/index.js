import React, { Component } from 'react';
import style from './index.scss';
import cs from 'classnames';
import { actions } from '../../actions';
import { toHHMMSS, getColorMap, parseText } from '../../utils/core';
import { connect } from '../../utils/providerHelper';
import Modal from '../../../Modal';
import {
  STRING_DELETED_COMMENT_CANT_BE_RESTORED,
  STRING_DELETE,
  STRING_CANCEL,
  MAX_CHAR_LIMIT_COMMENT
} from '../../config/constants';
import PropTypes from 'prop-types';

class CommentBox extends Component {
  static propTypes = {
    showCommentBox: PropTypes.func,
    hideCommentBox: PropTypes.func,
    readOnly: PropTypes.bool,
    deleteComment: PropTypes.func,
    id: PropTypes.string,
    editComment: PropTypes.func,
    time: PropTypes.number,
    postComment: PropTypes.func,
    xPosRaw: PropTypes.number,
    commentText: PropTypes.string,
    edit: PropTypes.bool,
    showError: PropTypes.bool,
    author: PropTypes.object,
    commentBoxRenderer: PropTypes.func,
    clientWidth: PropTypes.number
  };
  static getDerivedStateFromProps(props, state) {
    if (props.showError && state.disableSaveButton) {
      clearTimeout(state.timer);
      state.disableSaveButton = false;
      state.timer = setTimeout(() => {
        props.hideCommentBoxError();
      }, 3000);
      return state;
    }
    return null;
  }
  constructor() {
    super();
    this.textAreaChangeHandler = this.textAreaChangeHandler.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
    this.deleteClickHandler = this.deleteClickHandler.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.emojiOnSelectHandler = this.emojiOnSelectHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    let intialState = {
      disableSaveButton: true
    };
    this.state = intialState;
  }

  state = {
    xPos: null,
    downArrowXPos: null
  };

  inputRef = node => {
    this.commentTextArea = node;
  };

  boxRef = commentBox => {
    if (commentBox) {
      this.commentBox = commentBox;
      this.calculateXPos();
    }
  };

  calculateXPos = () => {
    let { xPosRaw, clientWidth } = this.props;
    let width = this.commentBox.getBoundingClientRect().width;
    let _xPos = xPosRaw;
    let availableWindow = _xPos + width / 2,
      upperXLimit = clientWidth;

    _xPos -= width / 2;
    if (availableWindow > upperXLimit) {
      _xPos = clientWidth - width;
    }

    if (_xPos < 0) {
      _xPos = 0;
    }
    let downArrowXPos = xPosRaw - _xPos;
    downArrowXPos = downArrowXPos < 10 ? 10 : downArrowXPos;
    downArrowXPos = downArrowXPos > width - 30 ? width - 30 : downArrowXPos;
    this.setState({
      xPos: _xPos,
      downArrowXPos
    });
  };

  emojiOnSelectHandler(selectedEmoji) {
    if (
      this.commentTextArea &&
      this.commentTextArea.value.length < MAX_CHAR_LIMIT_COMMENT
    ) {
      let text = this.commentTextArea.value + selectedEmoji;
      this.props.showCommentBox({
        text
      });
      this.setState({
        disableSaveButton: false
      });
      this.commentTextArea.focus();
    }
  }

  textAreaChangeHandler(e) {
    let text = e.target.value;
    text = text && text.trim();
    this.setState({
      disableSaveButton: text ? false : true
    });
    this.props.showCommentBox({
      text: e.target.value
    });
  }

  closeSelf() {
    this.props.hideCommentBox();
  }

  editClickHandler() {
    this.props.showCommentBox({
      readOnly: false
    });
    this.setState({
      disableSaveButton: false
    });
    if (!this.commentTextArea) {
      return;
    }
    this.commentTextArea.addEventListener('keydown', this.autosize.bind(this));
    this.commentTextArea.focus();
  }

  componentDidMount() {
    this.autosize();
    if (!this.props.readOnly && this.commentTextArea) {
      this.commentTextArea.addEventListener(
        'keydown',
        this.autosize.bind(this)
      );
      this.commentTextArea.addEventListener('paste', this.autosize);
      this.commentTextArea.value = parseText();
      this.commentTextArea.focus();
    }
  }

  deleteClickHandler(event) {
    event.stopPropagation();
    let props = this.props;
    Modal.confirm({
      showFooter: true,
      title: STRING_DELETED_COMMENT_CANT_BE_RESTORED,
      okText: STRING_DELETE,
      cancelText: STRING_CANCEL,
      closable: true,
      onOk: () => {
        this.props.deleteComment({
          id: props.id
        });
        this.props.hideCommentBox();
      }
    });
  }

  postCommentHandler() {
    if (this.state.disableSaveButton) {
      return;
    }
    let text = this.commentTextArea.value && this.commentTextArea.value.trim();
    if (!text) {
      return;
    }
    this.setState({
      disableSaveButton: true
    });
    if (this.props.id) {
      this.props.editComment({
        id: this.props.id,
        text: text,
        time: this.props.time
      });
    } else {
      this.props.postComment({
        text,
        time: this.props.time
      });
    }
    this.closeSelf();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
    clearTimeout(this.autoSizeTimer);
    this.commentTextArea &&
      this.commentTextArea.removeEventListener('keydown', this.autosize);
  }

  autosize() {
    let el = this.commentTextArea;
    if (!el) {
      return;
    }
    this.autoSizeTimer = setTimeout(function() {
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 50);
  }

  commentDidUpdate() {
    this.autosize();
  }

  render() {
    const {
      time,
      commentText,
      readOnly,
      edit,
      showError,
      author,
      commentBoxRenderer
    } = this.props;
    let { xPos, downArrowXPos } = this.state;
    const { disableSaveButton } = this.state;
    let divCls = cs(style.boxWrapper, {
      [style.hide]: xPos === null
    });
    let divStyle = {
        left: xPos
      },
      timestampReadable = toHHMMSS(time),
      downArrowStyle,
      timeStampColor;
    var opts = {};
    if (readOnly) {
      opts['readOnly'] = 'readOnly';
    }
    if (downArrowXPos) {
      downArrowStyle = {
        left: downArrowXPos + 'px'
      };
    }
    let colorMap = getColorMap();
    if (author && author.id && colorMap[author.id]) {
      timeStampColor = {
        backgroundColor: colorMap[author.id]
      };
    }

    return (
      <div style={divStyle} className={divCls}>
        {commentBoxRenderer({
          id: this.props.id,
          commentText,
          edit,
          showError,
          disableSaveButton,
          timestampReadable,
          downArrowStyle,
          timeStampColor,
          readOnly,
          textAreaOpts: opts,
          editClickHandler: this.editClickHandler,
          deleteClickHandler: this.deleteClickHandler,
          textAreaChangeHandler: this.textAreaChangeHandler,
          emojiOnSelectHandler: this.emojiOnSelectHandler,
          postCommentHandler: this.postCommentHandler,
          closeSelf: this.closeSelf,
          inputRef: this.inputRef,
          boxRef: this.boxRef
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    xPosRaw: state.commentBox.data.xPosRaw,
    clientWidth: state.commentBox.data.clientWidth,
    time: state.commentBox.data.time,
    author: state.commentBox.data.author,
    commentText: state.commentBox.data.text,
    readOnly: state.commentBox.data.readOnly,
    id: state.commentBox.data.id,
    showError: state.commentBox.error,
    postComment: state.postComment,
    editComment: state.editComment,
    deleteComment: state.deleteComment,
    commentBoxRenderer: state.commentBoxRenderer
  };
}

export default connect(
  mapStateToProps,
  actions
)(CommentBox);
