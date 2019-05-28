import React from 'react';
import { storiesOf } from '@storybook/react';
import Popover from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Popover', module);
stories.addDecorator(withKnobs);

stories.add(
  'Popover',
  withInfo('Basic usage popover')(() => (
    <Popover
      title="This is sample title"
      trigger="hover"
      placement="leftBottom"
    >
      hover me
    </Popover>
  ))
);
