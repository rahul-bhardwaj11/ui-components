import React from 'react';
import renderer from 'react-test-renderer';
import Popover from './index';

describe('Popover', () => {
  it('matches default snapshot', () => {
    const tree = renderer
      .create(
        <Popover title="text will come here" trigger="hover">
          hover me
        </Popover>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
