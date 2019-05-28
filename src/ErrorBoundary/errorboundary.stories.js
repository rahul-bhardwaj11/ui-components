import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import ErrorBoundary from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('ErrorBoundary', module);
stories.addDecorator(withKnobs);

class RandomErrorComponent extends Component {
  componentDidMount() {
    throw new Error('Error');
  }

  render() {
    return <div>Dummy</div>;
  }
}

stories.add(
  'ErrorBoundary',
  withInfo('Basic usage ErrorBoundary')(() => (
    <ErrorBoundary>
      <RandomErrorComponent />
    </ErrorBoundary>
  ))
);
