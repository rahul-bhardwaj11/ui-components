import React from 'react';

import { storiesOf } from '@storybook/react';
import Dropdown from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs';
import { Icon } from 'antd';

const stories = storiesOf('Dropdown', module);
stories.addDecorator(withKnobs);

const options = [
  { key: '1', content: 'First Item' },
  { key: '2', content: 'Second Item' },
  { key: '3', content: 'Third Item', cautious: true }
];

stories
  .add(
    'Default Dropdown',
    withInfo('Basic usage of the Dropdown')(() => (
      <Dropdown options={object('options', options)}>
        <a className="ant-dropdown-link" href="#">
          Hover me
        </a>
      </Dropdown>
    ))
  )
  .add(
    'Button Dropdown',
    withInfo('Basic usage of the Dropdown')(() => (
      <Dropdown
        options={object('options', options)}
        type="button"
        label={'button'}
      />
    ))
  )

  .add(
    'Link Dropdown',
    withInfo('Basic usage of the Dropdown')(() => (
      <Dropdown options={object('options', options)} trigger={'click'}>
        <a className="ant-dropdown-link" href="#">
          Click me <Icon type="down" />
        </a>
      </Dropdown>
    ))
  );
