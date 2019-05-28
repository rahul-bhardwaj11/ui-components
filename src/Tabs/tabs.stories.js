import React from 'react';

import { storiesOf } from '@storybook/react';
import Tabs from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, text } from '@storybook/addon-knobs';

const stories = storiesOf('Tabs', module);
stories.addDecorator(withKnobs);

const panes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3' }
];

stories.add(
  'Default Tabs',
  withInfo('Basic usage of the Tabs')(() => (
    <Tabs
      options={object('options', panes)}
      activeKey={text('activeKey', '1')}
    />
  ))
);
