import React from 'react';

import { storiesOf } from '@storybook/react';
import Description from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Description', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'Default Description',
    withInfo('Basic usage of Description')(() => (
      <Description heading="Description" />
    ))
  )
  .add(
    'Full Description',
    withInfo('Basic usage of Description')(() => (
      <Description type={'full'} style={{ height: '300px' }} />
    ))
  );
