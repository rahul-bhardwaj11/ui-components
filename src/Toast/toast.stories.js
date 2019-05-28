import React from 'react';

import { storiesOf } from '@storybook/react';
import Toast, { TOAST_TYPES } from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, text } from '@storybook/addon-knobs';

const stories = storiesOf('Toast', module);
stories.addDecorator(withKnobs);

stories.add(
  'Sucess Toast',
  withInfo('Default Toast')(() => (
    <Toast
      type={select('type', TOAST_TYPES) || TOAST_TYPES[0]}
      message={text('message', 'Success message')}
    />
  ))
);
