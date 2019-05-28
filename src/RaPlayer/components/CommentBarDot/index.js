import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.scss';
import cs from 'classnames';

class CommentBarDot extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onMouseIn: PropTypes.func,
    onMouseOut: PropTypes.func,
    colorMap: PropTypes.object,
    videoDuration: PropTypes.number,
    commentBarClassName: PropTypes.string
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {
      comments,
      onMouseIn,
      onMouseOut,
      colorMap,
      videoDuration,
      commentBarClassName
    } = this.props;
    if (!videoDuration) {
      return null;
    }
    return (
      <div className={cs(commentBarClassName, style.container)}>
        {comments.map(comment => {
          let position = (comment.time * 100) / videoDuration;
          let divStyle = {
            left: position + '%',
            background: colorMap[comment.author.id]
          };
          return (
            <div
              className={style.commentBarDot}
              style={divStyle}
              text={comment.text}
              key={comment.id}
              onMouseOver={e => onMouseIn(e, comment)}
              onMouseOut={onMouseOut}
            />
          );
        })}
      </div>
    );
  }
}

export default CommentBarDot;
