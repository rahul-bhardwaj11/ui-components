import React from 'react';

import { storiesOf } from '@storybook/react';
import Skeleton from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Skeleton', module);
stories.addDecorator(withKnobs);

stories.add('Skeleton', withInfo('Skeleton')(() => <Skeleton />));
