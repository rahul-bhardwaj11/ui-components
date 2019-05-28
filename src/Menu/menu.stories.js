import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, text } from '@storybook/addon-knobs';

const stories = storiesOf('Menu', module);
stories.addDecorator(withKnobs);

const options = [
  { key: '1', content: '<b>First Item</b>' },
  { key: '2', content: 'Second Item' },
  { key: '3', content: 'Third Item' }
];

stories
  .add(
    'Default Menu',
    withInfo('Basic usage of the Menu')(() => (
      <Menu
        options={object('options', options)}
        mode={text('mode', 'horizontal')}
      />
    ))
  )
  .add(
    'Vertical Menu',
    withInfo('Vertical Menu')(() => (
      <Menu
        options={object('options', options)}
        mode={text('mode', 'vertical')}
      />
    ))
  );
