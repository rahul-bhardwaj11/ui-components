import React from 'react';

import { storiesOf } from '@storybook/react';
import TextArea from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, number } from '@storybook/addon-knobs';

const stories = storiesOf('TextArea', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'Default TextArea',
    withInfo('Basic usage height based on content lines')(() => (
      <TextArea placeholder={text('Placeholder')} autosize />
    ))
  )
  .add(
    'TextArea with min and max rows',
    withInfo(
      'Basic usage Autosize height with minimum and maximum number of lines'
    )(() => (
      <TextArea
        placeholder={text('Placeholder')}
        autosize={{
          minRows: number('minRows', 2),
          maxRows: number('maxRows', 4)
        }}
      />
    ))
  );
