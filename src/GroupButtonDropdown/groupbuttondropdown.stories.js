import React from 'react';

import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';
import GroupButtonDropdown from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, text } from '@storybook/addon-knobs';

const stories = storiesOf('GroupButtonDropdown', module);
stories.addDecorator(withKnobs);

const options = [
  {
    key: '1',
    content:
      'First Item First ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst Item'
  },
  { key: '2', content: 'Second Item' },
  { key: '3', content: 'Third Item' }
];

class SomeReactComponent extends React.Component {
  static propTypes = {
    content: PropTypes.any
  };

  render() {
    let { content } = this.props;
    return <div style={{ left: -50 }}>{content}</div>;
  }
}

stories
  .add(
    'Default GroupButtonDropdown',
    withInfo('Basic usage of the GroupButtonDropdown')(() => (
      <GroupButtonDropdown
        options={object('options', options)}
        label={text('label', 'Add')}
      />
    ))
  )
  .add(
    'GroupButtonDropdown with any HTML children',
    withInfo('GroupButtonDropdown with any HTML children')(() => (
      <GroupButtonDropdown
        options={
          <SomeReactComponent content="This is child component for dropdown" />
        }
        label={text('label', 'Add')}
      />
    ))
  );
