import React from 'react';

import { storiesOf } from '@storybook/react';
import Input from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Input', module);
stories.addDecorator(withKnobs);

const styles = {
  width: '200px'
};

stories
  .add(
    'Default Input',
    withInfo('Basic usage of the Input')(() => (
      <div style={styles}>
        <Input placeholder={text('Placeholder', 'Placeholder')} />
      </div>
    ))
  )
  .add(
    'Input with Numeric value',
    withInfo('Basic usage of the Input')(() => (
      <div style={styles}>
        <Input
          placeholder={text('Placeholder', 'Placeholder')}
          type="number"
          max={5}
        />
      </div>
    ))
  )
  .add(
    'Input with maxChar length',
    withInfo('Basic usage of the Input')(() => (
      <div style={styles}>
        <Input
          placeholder={text('Placeholder', 'Placeholder')}
          showMaxLength={true}
          maxLength={40}
        />
      </div>
    ))
  );
