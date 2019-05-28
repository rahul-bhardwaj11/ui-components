import React from 'react';

import { storiesOf } from '@storybook/react';
import Collapse from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs';

const stories = storiesOf('Collapse', module);
stories.addDecorator(withKnobs);

const customPanelStyle = {
  borderRadius: 8,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};

const options = [
  { header: 'This is panel header 1', content: ['First Item'] },
  { header: 'This is panel header 2', content: '<b>Second Item</b>' },
  { header: 'This is panel header 3', content: 'Third Item' }
];

stories.add(
  'Default Collapse',
  withInfo('Basic usage of the Collapse')(() => (
    <Collapse options={object('options', options)} />
  ))
);
stories.add(
  'Custom Collapse',
  withInfo('Basic usage of the Custom Collapse')(() => (
    <Collapse
      options={object('options', options)}
      panelStyle={object('panelStyle', customPanelStyle)}
    />
  ))
);
