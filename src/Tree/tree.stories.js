import React from 'react';

import { storiesOf } from '@storybook/react';
import Tree from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Tree', module);
stories.addDecorator(withKnobs);

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0'
      },
      {
        title: '0-0-1',
        key: '0-0-1'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0',
        key: '0-1-0'
      }
    ]
  },
  { title: '0-2', key: '0-2' }
];

stories.add(
  'Tree',
  withInfo('Basic usage of the Tree')(() => <Tree treeData={treeData} />)
);
