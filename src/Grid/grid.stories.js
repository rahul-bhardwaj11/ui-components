import React from 'react';

import { storiesOf } from '@storybook/react';
import { Row, Col } from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Grid', module);
stories.addDecorator(withKnobs);

stories.add(
  'Grid',
  withInfo('Adding Grid for responsive')(() => (
    <Row>
      <Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={10}>
        Col
      </Col>
      <Col xs={20} sm={16} md={12} lg={8} xl={10} xxl={10}>
        Col
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={0} xxl={0}>
        Col
      </Col>
    </Row>
  ))
);
