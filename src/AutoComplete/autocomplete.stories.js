import React from 'react';
import { storiesOf } from '@storybook/react';
import AutoComplete from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import TextArea from '../TextArea';

const stories = storiesOf('AutoComplete', module);
stories.addDecorator(withKnobs);

let option = [
  'first',
  'second',
  'third',
  'irstvghasvghasirstvghasvghasirstvghasvghasirstvghasvghasirstvghasvghasirstvghasvghasirstvghasvghasirstvghasvghas'
];
const handleSearch = () => {};
stories.add(
  'AutoComplete',
  withInfo('Basic usage AutoComplete')(() => (
    <AutoComplete
      dataSource={option}
      style={{ width: 200 }}
      onSelect={() => {}}
      onSearch={handleSearch}
      placeholder="input here"
    />
  ))
);
stories.add(
  'AutoComplete With Custom Input',
  withInfo('Custom Input AutoComplete')(() => (
    <AutoComplete
      dataSource={option}
      style={{ width: 200 }}
      onSelect={() => {}}
      onSearch={handleSearch}
      backfill
    >
      <TextArea placeholder="input here" autosize={{ maxRows: 4 }} />
    </AutoComplete>
  ))
);
