import React from 'react';
import { storiesOf } from '@storybook/react';
import ConfirmBox from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('ConfirmBox', module);
stories.addDecorator(withKnobs);

stories.add(
  'ConfirmBox',
  withInfo('Basic usage ConfirmBox')(() => (
    <ConfirmBox title="Are your sure you want to delete ?" placement="bottom">
      <a href="#">Delete</a>
    </ConfirmBox>
  ))
);
