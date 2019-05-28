import React from 'react';
import CommentHelperBox from '../components/CommentHelperBox';
import CommentBox from '../components/CommentBox';

export function commentBoxHelperRenderer(props) {
  return <CommentHelperBox {...props} />;
}

export function commentBoxRenderer(props) {
  return <CommentBox {...props} />;
}
