import React from 'react';
import { storiesOf } from '@storybook/react';
import SelectWithSearch from './index';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import UserThumbnail from '../UserThumbnail';
//import Menu from '../Menu';

const stories = storiesOf('SelectWithSearch', module);
stories.addDecorator(withKnobs);
const colourOptions = [
  {
    value: 'ocean',
    label: 'Oceangfcfgcgscgfscfgscghghcfghsacfgcfgcsaccfcfcfascfgcfasgfhags',
    color: '#00B8D9'
  },
  { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' }
];

const filterColors = search =>
  colourOptions.filter(i =>
    i.label.toLowerCase().includes(search.toLowerCase())
  );

const promiseOption = ({ search }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(search));
    }, 1000);
  });

stories.add(
  'Sync Select',
  withInfo('Basic usage of the SelectWithSearch')(() => (
    <SelectWithSearch
      defaultValue={colourOptions[2].value}
      label="Select..."
      options={colourOptions}
      onChange={() => {}}
    />
  ))
);

stories.add(
  'Sync Select with Button',
  withInfo('Basic usage of the SelectWithSearch')(() => (
    <SelectWithSearch
      defaultValue={colourOptions[2].value}
      label="Select..."
      options={colourOptions}
      onChange={() => {}}
      isButton={true}
      buttonMaxWidth={'110px'}
      buttonMinWidth={'30px'}
      showSearch={boolean('showSearch', true)}
    />
  ))
);

stories.add(
  'Sync Select with custom options',
  withInfo('Usage of the Async Infinite Select')(() => (
    <SelectWithSearch
      options={colourOptions}
      onChange={() => {}}
      isMulti={true}
      optionRenderer={({ value, label }) => {
        return (
          <UserThumbnail
            title={label}
            content={value}
            src=""
            expanded={true}
            className="userThumbnail"
          />
        );
      }}
    />
  ))
);

stories.add(
  'Sync Select with custom styles',
  withInfo('Basic usage of the SelectWithSearch for custom style')(() => (
    <SelectWithSearch
      defaultValue={colourOptions[2].value}
      label="Select..."
      options={colourOptions}
      onChange={() => {}}
      styles={{
        option: base => {
          return {
            ...base,
            background: '#ddd'
          };
        },
        container: base => ({ ...base, maxWidth: '300px' })
      }}
    />
  ))
);

stories.add(
  'Sync MultiSelect',
  withInfo('Basic usage of the SelectWithSearch')(() => (
    <SelectWithSearch
      defaultValue={colourOptions[2].value}
      label="Select..."
      options={colourOptions}
      onChange={() => {}}
      isMulti
      sortOptions={false}
    />
  ))
);

stories.add(
  'Sync MultiSelect With Controlled Value',
  withInfo('Basic usage of the SelectWithSearch')(() => (
    <SelectWithSearch
      defaultValue={colourOptions[2].value}
      label="Select..."
      options={colourOptions}
      onChange={() => {}}
      isMulti
      sortOptions={false}
      value={[colourOptions[2].value, colourOptions[3].value]}
    />
  ))
);

stories.add(
  'Sync MultiSelect with initially Button',
  withInfo('Basic usage of the SelectWithSearch')(() => (
    <SelectWithSearch
      defaultValue={colourOptions[2].value}
      label="Select..."
      options={colourOptions}
      onChange={() => {}}
      isMulti
      isButton={true}
      buttonMaxWidth={'110px'}
      buttonMinWidth={'30px'}
      showSearch={boolean('showSearch', true)}
    />
  ))
);

stories.add(
  'Async Select',
  withInfo('Usage of the Async Infinite Select')(() => (
    <SelectWithSearch
      async
      promiseOption={promiseOption}
      defaultValue={colourOptions[2]}
      onChange={() => {}}
    />
  ))
);

stories.add(
  'Async Select with default open',
  withInfo('Usage of the Async Infinite Select with default open')(() => (
    <SelectWithSearch
      async
      isMulti
      hideFooter
      persistOpen
      onSelect={action('Option selected')}
      promiseOption={promiseOption}
      defaultValue={colourOptions[2]}
    />
  ))
);

stories.add(
  'Async MultiSelect',
  withInfo('Usage of the Async Infinite Select')(() => (
    <SelectWithSearch
      async
      promiseOption={promiseOption}
      defaultValue={colourOptions[2]}
      isMulti
      onChange={() => {}}
      isButton={true}
      showSearch={boolean('showSearch', true)}
    />
  ))
);

stories.add(
  'Async MultiSelect With controlled Values',
  withInfo('Usage of the Async Infinite Select')(() => (
    <SelectWithSearch
      async
      promiseOption={promiseOption}
      isMulti
      onChange={() => {}}
      isButton={true}
      value={[colourOptions[2], colourOptions[5]]}
      showSearch={boolean('showSearch', true)}
    />
  ))
);

stories.add(
  'Async MultiSelect With default value',
  withInfo('Usage of the Async Infinite Select')(() => (
    <SelectWithSearch
      async
      promiseOption={promiseOption}
      defaultValue={[colourOptions[2], colourOptions[4]]}
      isMulti
      onChange={() => {}}
      isButton={true}
      showSearch={boolean('showSearch', true)}
    />
  ))
);
