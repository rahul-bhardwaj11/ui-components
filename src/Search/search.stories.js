import React from 'react';

import { storiesOf } from '@storybook/react';
import Search from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Search', module);
stories.addDecorator(withKnobs);

stories.add(
  'Search',
  withInfo('Basic usage of the Search')(() => (
    <Search placeholder="input search text" style={{ width: 200 }} />
  ))
);
