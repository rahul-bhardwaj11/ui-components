import React from 'react';

import { storiesOf } from '@storybook/react';
import ErrorPage, { PAGE_TYPES } from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('ErrorPage', module);
stories.addDecorator(withKnobs);

stories.add(
  '404 Error',
  withInfo('Differnet Error Pages')(() => (
    <ErrorPage pageType={PAGE_TYPES.NOT_FOUND} />
  ))
);

stories.add(
  '500 Error',
  withInfo('Differnet Error Pages')(() => (
    <ErrorPage pageType={PAGE_TYPES.INTERNAL_SERVER_ERROR} />
  ))
);

stories.add(
  '503 Error',
  withInfo('Differnet Error Pages')(() => (
    <ErrorPage pageType={PAGE_TYPES.SERVICE_UNAVAILABLE} />
  ))
);

stories.add(
  '404 Error without Logo',
  withInfo('Differnet Error Pages')(() => (
    <ErrorPage showLogo={false} pageType={PAGE_TYPES.SERVICE_UNAVAILABLE} />
  ))
);

stories.add(
  '403 Forbidden',
  withInfo('403 Error Pages')(() => (
    <ErrorPage pageType={PAGE_TYPES.FORBIDDEN} />
  ))
);
