import React from 'react';

import { storiesOf } from '@storybook/react';
import DatePicker from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('DatePicker', module);
stories.addDecorator(withKnobs);

stories.add(
  'DatePicker',
  withInfo('Adding type primary to button')(() => (
    <DatePicker fullscreen={false} />
  ))
);
