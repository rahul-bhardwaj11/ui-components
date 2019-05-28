import React from 'react';

import { storiesOf } from '@storybook/react';
import Switch from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('Switch', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default Switch',
  withInfo('Basic usage of the Switch')(() => (
    <Switch checked={boolean('checked', true)} />
  ))
);
