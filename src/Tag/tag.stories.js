import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

const stories = storiesOf('Tag', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'Default tag',
    withInfo('Basic usage of the Default tag')(() => (
      <Tag
        type={select('type', [
          'normal',
          'add',
          'added',
          'selected',
          'selection',
          'action'
        ])}
        disabled={boolean('disabled', false)}
        applied={boolean('applied', false)}
        checkable={boolean('checkable', false)}
        closable={boolean('closable', false)}
      >
        {text('children', 'tag')}
      </Tag>
    ))
  )
  .add(
    'Applied tag',
    withInfo('Basic usage of the Default tag with applied')(() => (
      <Tag applied={true}>{text('children', 'tag')}</Tag>
    ))
  )
  .add(
    'Add tag',
    withInfo('Basic usage of the Default tag add')(() => (
      <Tag type="add">{text('children', 'Add')}</Tag>
    ))
  )
  .add(
    'Added tag',
    withInfo('Basic usage of the Default tag added')(() => (
      <Tag type="added">{text('children', 'Cancel')}</Tag>
    ))
  )
  .add(
    'Selection tag',
    withInfo('Basic usage of the Default tag selection')(() => (
      <Tag type="selection">{text('children', 'Tick')}</Tag>
    ))
  )
  .add(
    'Selected tag',
    withInfo('Basic usage of the Default tag selected')(() => (
      <Tag checkable>{text('children', 'tag')}</Tag>
    ))
  )
  .add(
    'Action tag',
    withInfo('Basic usage of the Default tag action')(() => (
      <Tag type="action">{text('children', 'tag')}</Tag>
    ))
  )
  .add(
    'Disabled tag',
    withInfo('Basic usage of the Default tag Disabled')(() => (
      <Tag disabled={true}>{text('children', 'tag')}</Tag>
    ))
  );
