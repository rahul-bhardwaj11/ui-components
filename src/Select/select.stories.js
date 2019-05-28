import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs';

const stories = storiesOf('Select', module);
stories.addDecorator(withKnobs);

const options = [
  { key: '1', content: 'First Item' },
  { key: '2', content: 'Second Item' },
  { key: '3', content: 'Third Item', disabled: true }
];

class ControlledSelect extends React.Component {
  state = {
    value: '3'
  };
  render() {
    return (
      <Select
        options={object('options', options)}
        value={this.state.value}
        onSelect={key => {
          this.setState({ value: key });
        }}
      />
    );
  }
}
stories.add(
  'Default Select',
  withInfo('Basic usage of the Select')(() => (
    <Select
      options={object('options', options)}
      defaultValue="Select"
      showTick={true}
    />
  ))
);

stories
  .add(
    'Controlled Select',
    withInfo('Basic usage of the Select')(() => <ControlledSelect />)
  )
  .add(
    'Multiple Select',
    withInfo('Basic usage of the Multiple Select')(() => (
      <Select
        options={object('options', options)}
        defaultValue="Select"
        mode="multiple"
      />
    ))
  )
  .add(
    'Async Select',
    withInfo('Basic usage of Async Select')(() => (
      <Select.Async
        mode="multiple"
        placeholder="Search any artist"
        handleSearch={handleSearch}
        handleChange={console.log} //eslint-disable-line
        notFoundContent={null}
      />
    ))
  );
stories.add(
  'Select with different dropdown width',
  withInfo('Basic usage of the Select')(() => (
    <Select
      options={object('options', options)}
      defaultValue="Select"
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: '150px' }}
    />
  ))
);

function handleSearch(value) {
  const url = 'https://itunes.apple.com/search?term=';
  return fetch(`${url}${value}`)
    .then(response => response.json())
    .then(({ results }) =>
      results.map(v => ({
        content: `${v.trackName} by ${v.artistName}`,
        key: `${v.trackId}-${v.artistId}`
      }))
    );
}
