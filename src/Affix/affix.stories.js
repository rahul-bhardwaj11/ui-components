import React from 'react';
import { storiesOf } from '@storybook/react';
import Affix from './index';
import Button from '../Button';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Affix', module);
stories.addDecorator(withKnobs);
stories.add(
  'Affix',
  withInfo('Basic usage Affix')(() => (
    <Affix offsetTop={40}>
      <Button type="primary">Affix top</Button>
    </Affix>
  ))
);
