import React from 'react';

import { storiesOf } from '@storybook/react';
import Radio from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('Radio', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'Default Radio',
    withInfo('Basic usage of the Radio')(() => (
      <Radio
        checked={boolean('checked', true)}
        disabled={boolean('disabled', true)}
      >
        {text('children', 'Radio')}
      </Radio>
    ))
  )
  .add(
    'Radio Group',
    withInfo('Usage of the RadioGroup')(() => (
      <Radio.Group>
        <Radio value={1}>1</Radio>
        <Radio value={2}>2</Radio>
        <Radio value={3}>3</Radio>
        <Radio value={4}>4</Radio>
      </Radio.Group>
    ))
  );
