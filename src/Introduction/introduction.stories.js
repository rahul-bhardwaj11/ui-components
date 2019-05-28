import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../../README.md';
import Contribution from '../../docs/CONTRIBUTING.md';
import AddingStory from '../../docs/adding-story.md';

storiesOf('Introduction', module)
  .add('Getting started', () => <Markdown source={Readme} />)
  .add('Contribution', () => <Markdown source={Contribution} />)
  .add('Documenting components', () => <Markdown source={AddingStory} />);
