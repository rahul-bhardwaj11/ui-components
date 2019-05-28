import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from '.';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';

const marks = {
  0: {
    label: '0',
    tooltip: 'score is 0 here'
  },
  2: {
    tooltip: 'score is 2 here'
  },
  4: {
    tooltip: 'score is 4 here'
  },
  8: {
    tooltip: 'score is 8 here'
  },
  10: {
    label: '10',
    tooltip: 'score is 10 here'
  }
};

class ControlledSlider extends React.Component {
  state = {
    value: 6
  };
  onChange = value => {
    this.setState({ value });
  };
  render() {
    return (
      <Slider
        min={0}
        max={10}
        marks={marks}
        value={this.state.value}
        onChange={this.onChange}
        disabled={boolean('disabled', false)}
        dots={true}
        step={1}
      />
    );
  }
}

const stories = storiesOf('Slider', module);
stories.addDecorator(withKnobs);

stories.add(
  'Slider default',
  withInfo('Slider without tooltip')(() => <Slider defaultValue={6} />)
);
stories.add(
  'Slider with dots',
  withInfo('Slider with tooltip')(() => (
    <Slider dots={true} step={2} min={0} max={10} marks={marks} />
  ))
);
stories.add(
  'Controlled Slider with dots',
  withInfo('Slider with tooltip')(() => <ControlledSlider />)
);
stories.add(
  'Slider disabled',
  withInfo('Slider with tooltip')(() => (
    <Slider disabled={true} value={6} marks={marks} min={0} max={10} />
  ))
);
stories.add(
  'Slider disabled without tooltip',
  withInfo('Slider without tooltip')(() => (
    <Slider disabled={true} value={30} />
  ))
);
stories.add(
  'Slider with double handle',
  withInfo('Slider without tooltip')(() => (
    <Slider range defaultValue={[20, 50]} />
  ))
);
