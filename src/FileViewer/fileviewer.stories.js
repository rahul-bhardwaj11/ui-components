import React from 'react';

import { storiesOf } from '@storybook/react';
import FileViewer from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('FileViewer', module);
stories.addDecorator(withKnobs);

stories
  .add(
    'FileViewer component',
    withInfo('Basic usage of the FileViewer')(() => (
      <FileViewer
        src={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
      />
    ))
  )
  .add(
    'FileViewer 300X300',
    withInfo('Basic usage of the FileViewer with 300X300')(() => (
      <FileViewer src={'https://www.fg-a.com/300x300.gif'} />
    ))
  )
  .add(
    'FileViewer 1000X400',
    withInfo('Basic usage of the FileViewer 1000X400')(() => (
      <FileViewer
        src={'http://www.idmagroup.co.in/images/gallery/1.png'}
        style={{ borderRadius: 8 }}
      />
    ))
  );
