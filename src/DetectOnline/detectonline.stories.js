import React from 'react';

import { storiesOf } from '@storybook/react';
import { Online, Offline } from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('DetectOnline', module);
stories.addDecorator(withKnobs);

stories.add(
  'DetectOnline',
  withInfo('Sample usage of DetectOnline')(() => (
    <div>
      <Online>Only shown when you are online</Online>
      <Offline>Only shown offline (surprise!)</Offline>
    </div>
  ))
);
