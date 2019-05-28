import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckBox from './index';
import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('CheckBox', module);
stories.addDecorator(withKnobs);
stories
  .add(
    'Default CheckBox',
    withInfo('Basic usage of the Checkbox')(() => (
      <CheckBox>{'Checkbox'}</CheckBox>
    ))
  )
  .add(
    'Checked CheckBox',
    withInfo('Checked checkbox')(() => (
      <CheckBox
        checked={boolean('checked', true)}
        disabled={boolean('disabled', false)}
      >
        {'Checkbox'}
      </CheckBox>
    ))
  )
  .add(
    'Indeterminate CheckBox',
    withInfo('Indeterminate checkbox')(() => <CheckBox indeterminate={true} />)
  );
