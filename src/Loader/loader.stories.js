import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader, { LOADING_SIZE, LOADER_TYPE } from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import theme from '../styles/theme';

const stories = storiesOf('Loader', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'Loader',
    withInfo('Add Basic loader')(() => (
      <Loader
        loadingMessage={text('loadingMessage', '')}
        message={text('message', 'Loading....')}
        type={select('type', Object.keys(LOADER_TYPE))}
        size={select('size', Object.keys(LOADING_SIZE))}
      />
    ))
  )
  .add(
    'Loader color',
    withInfo('Add Basic loader')(() => (
      <Loader
        loadingMessage={text('loadingMessage', '')}
        message={text('message', 'Loading....')}
        type={select('type', Object.keys(LOADER_TYPE))}
        size={select('size', Object.keys(LOADING_SIZE))}
        style={{
          loaderStyle: {
            borderColor: select('color', Object.values(theme.colors), '#4D7CC7')
          }
        }}
      />
    ))
  );
