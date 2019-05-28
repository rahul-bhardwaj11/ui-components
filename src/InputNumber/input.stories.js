import React from 'react';

import { storiesOf } from '@storybook/react';
import InputNumber from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('InputNumber', module);
stories.addDecorator(withKnobs);

const styles = {
  width: '200px'
};

stories.add(
  'Input with Numeric value',
  withInfo('Basic usage of the InputNumber')(() => (
    <div style={styles}>
      <InputNumber
        placeholder={text('Placeholder', 'Placeholder')}
        min={0}
        max={100}
        onChange={() => {}}
      />
    </div>
  ))
);
