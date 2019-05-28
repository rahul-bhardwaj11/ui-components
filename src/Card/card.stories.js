import React from 'react';

import { storiesOf } from '@storybook/react';
import Card from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Card', module);
stories.addDecorator(withKnobs);

stories.add(
  'Card',
  withInfo('Adding Card for responsive')(() => (
    <div>
      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  ))
);
