import React from 'react';
import { storiesOf } from '@storybook/react';
import AutoCompleteTag from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('AutoCompleteTag', module);
stories.addDecorator(withKnobs);
stories.add(
  'AutoCompleteTag',
  withInfo('Basic usage AutoComplete')(() => (
    <AutoCompleteTag tags={[]} onChange={() => {}} withSearch={true} />
  ))
);
