import React from 'react';
import PropTypes from 'prop-types';

import { parseText } from '../../utils/core';
import EmojiPicker from '../../components/EmojiPicker';

import style from './index.scss';
import { MAX_CHAR_LIMIT_COMMENT } from '../../config/constants';

export default function CommentBox({
  id,
  downArrowStyle,
  edit,
  disableSaveButton,
  commentText,
  showError,
  timestampReadable,
  timeStampColor,
  readOnly,
  textAreaOpts,
  editClickHandler,
  deleteClickHandler,
  textAreaChangeHandler,
  emojiOnSelectHandler,
  postCommentHandler,
  closeSelf,
  inputRef,
  boxRef
}) {
  return (
    <div className={style.acBox} ref={boxRef}>
      <div className={style.downArrow} style={downArrowStyle} />
      <div className={style.acBoxContent}>
        <div className={style.acBoxContentInfo}>
          <span className={style.time} style={timeStampColor}>
            {timestampReadable}
          </span>
        </div>
        {edit &&
          id &&
          disableSaveButton && (
            <div className={style.acControlTopRight}>
              <span
                onClick={editClickHandler}
                title="edit"
                className={style.edit}
              />
              <span
                onClick={deleteClickHandler}
                title="delete"
                className={style.delete}
              />
            </div>
          )}
        <textarea
          className={style.acBoxText}
          onChange={textAreaChangeHandler}
          onKeyUp={textAreaChangeHandler}
          maxLength={MAX_CHAR_LIMIT_COMMENT}
          {...textAreaOpts}
          ref={inputRef}
          value={parseText(commentText)}
        />
        <div
          className={
            style.acBoxControls + ' ' + (readOnly ? style.hide : style.show)
          }
        >
          <EmojiPicker toLeft="true" onSelect={emojiOnSelectHandler} />
          <span
            title="save"
            className={[
              style.acActionButton,
              style.save,
              disableSaveButton ? style.disable : ''
            ].join(' ')}
            onClick={postCommentHandler}
          />
          <span
            title="discard"
            className={[style.acActionButton, style.cancel].join(' ')}
            onClick={closeSelf}
          />
        </div>
        {showError && (
          <div className={[style.error, style.floatR].join(' ')}>
            Something went wrong.Please try again..
          </div>
        )}
      </div>
    </div>
  );
}

CommentBox.propTypes = {
  id: PropTypes.string,
  downArrowStyle: PropTypes.object,
  edit: PropTypes.bool,
  disableSaveButton: PropTypes.bool,
  commentText: PropTypes.string,
  showError: PropTypes.bool,
  timestampReadable: PropTypes.string,
  timeStampColor: PropTypes.object,
  readOnly: PropTypes.bool,
  textAreaOpts: PropTypes.object,
  editClickHandler: PropTypes.func,
  deleteClickHandler: PropTypes.func,
  textAreaChangeHandler: PropTypes.func,
  emojiOnSelectHandler: PropTypes.func,
  postCommentHandler: PropTypes.func,
  closeSelf: PropTypes.func,
  inputRef: PropTypes.func,
  boxRef: PropTypes.func
};
