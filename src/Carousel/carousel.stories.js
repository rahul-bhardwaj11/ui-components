import React from 'react';

import { storiesOf } from '@storybook/react';
import Carousel from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Carousel', module);
stories.addDecorator(withKnobs);

var data = [
  <div key={Math.random()}>
    <h3>{Math.floor(Math.random() * 100)}</h3>
  </div>,
  <div key={Math.random()}>
    <h3>{Math.floor(Math.random() * 100)}</h3>
  </div>,
  <div key={Math.random()}>
    <h3>{Math.floor(Math.random() * 100)}</h3>
  </div>,
  <div key={Math.random()}>
    <h3>{Math.floor(Math.random() * 100)}</h3>
  </div>
];
const promiseData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

stories.add(
  'Carousel',
  withInfo('Adding type primary to Carousel')(() => (
    <Carousel {...settings}>
      <div key="1">
        <h3>1</h3>
      </div>
      <div key="2">
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Carousel>
  ))
),
  stories.add(
    'Async Carousel',
    withInfo('Adding type primary to Carousel')(() => (
      <Carousel {...settings} pageSize={4} fetchData={promiseData} />
    ))
  );
stories.add(
  'Async Carousel Without Gradient',
  withInfo('Adding type primary to Carousel')(() => (
    <Carousel
      {...settings}
      pageSize={4}
      fetchData={promiseData}
      gradient={false}
    />
  ))
);
