/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import RaPlayer from './index';
import { withInfo } from '@storybook/addon-info';
// import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('RaPlayer', module);
// stories.addDecorator(withKnobs);

const props = {
  primaryTracks: [
    {
      src:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      label: '360p'
    },
    {
      src: '720p.mp4',
      label: '720p'
    }
  ],
  showControlsOnly: false,
  edit: true,
  showOnboarding: true,
  onRenderComplete: function() {
    console.info('dne...');
  },
  onCommentPaneRender: function(count) {
    console.info(count);
  },
  postComment: function(comment) {
    console.log(comment);
  },
  deleteComment: function(comment) {
    console.log(comment);
  },
  editComment: function(comment) {
    console.log(comment);
  },
  commentBarClassName: 'abc',
  videoControlsClassName: 'videoabc',
  videoSeekBarClassName: 'videoSeek'
  // commentBoxHelperRenderer: ({boxRef, ...props}) => <button ref={boxRef}>Test</button>
};

window.videoRef = React.createRef();

stories.add(
  'Default Player',
  withInfo('Information')(() => <RaPlayer ref={window.videoRef} {...props} />)
);

const secondaryPlayerProps = {
  ...props,
  secondaryTracks: [
    {
      src: '360p.mp4',
      label: 'ok'
    }
  ]
};

stories.add('With secondary player', () => (
  <RaPlayer {...secondaryPlayerProps} />
));

const commentProps = {
  ...props,
  comments: [
    {
      time: 46,
      id: '3',
      author: {
        id: 12,
        name: 'Rama'
      },
      text: 'Abc'
    },
    {
      time: 120,
      id: '4',
      author: {
        id: 12,
        name: 'Rama'
      },
      text: 'Abc'
    }
  ]
};

stories.add('With pre existing comments', () => <RaPlayer {...commentProps} />);
