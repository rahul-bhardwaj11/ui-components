import React from 'react';

import { storiesOf } from '@storybook/react';
import Icon from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Icon', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default Icon component',
  withInfo('Basic usage of the Icon')(() => (
    <div>
      <Icon gradient={true} type="googleCalendar" />
      <Icon gradient={true} type="noSearchResults" />
    </div>
  ))
);
