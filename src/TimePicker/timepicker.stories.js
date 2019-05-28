import React from 'react';

import { storiesOf } from '@storybook/react';
import TimePicker from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('TimePicker', module);
stories.addDecorator(withKnobs);

stories.add(
  'TimePicker',
  withInfo('Basic Usage Of Timepicker')(() => (
    <TimePicker onSelect={val => val} defaultValue={{ hour: 22, min: 30 }} />
  ))
);
