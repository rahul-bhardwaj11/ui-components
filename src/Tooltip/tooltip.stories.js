import React from 'react';

import { storiesOf } from '@storybook/react';
import Tooltip from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Tooltip', module);
stories.addDecorator(withKnobs);

stories.add(
  'Tooltip',
  withInfo('Basic usage tooltip')(() => (
    <div>
      <Tooltip title="prompt text">
        <span>Tooltip will show when mouse enter.</span>
      </Tooltip>
    </div>
  ))
);
