import React from 'react';

import { storiesOf } from '@storybook/react';
import Link from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Link', module);
stories.addDecorator(withKnobs);

stories.add(
  'Anchor link',
  withInfo('Basic usage Anchor link')(() => <Link title="link" href="#" />)
);
