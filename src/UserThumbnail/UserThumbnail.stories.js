import React from 'react';
import { storiesOf } from '@storybook/react';
import UserThumbnail from './index';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs, select } from '@storybook/addon-knobs/';
const stories = storiesOf('UserThumbnail', module);
stories.addDecorator(withKnobs);
stories
  .add(
    'UserThumbnail Small',
    withInfo('Adding type primary to button')(() => (
      <UserThumbnail
        size={text('size', 'small')}
        shape={text('shape', 'circle')}
      />
    ))
  )
  .add(
    'UserThumbnail Large',
    withInfo('Adding type primary to button')(() => (
      <UserThumbnail
        title={text('title', 'MindTickle')}
        content={text('content', 'mind@tickle.com')}
        src={text(
          'src',
          'https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=0&oh=b5d3d05354c7f787e565411601b526c0&oe=5C077FE9'
        )}
        size={select('size', ['large', 'small'])}
        shape={select('shape', ['circle', 'square'])}
        expanded={true}
      />
    ))
  );
