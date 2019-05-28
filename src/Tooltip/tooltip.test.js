import React from 'react';
import renderer from 'react-test-renderer';
import Tooltip from './index';

describe('Tooltip', () => {
  it('matches default snapshot', () => {
    const tree = renderer
      .create(
        <Tooltip title="prompt text">
          <span>Tooltip will show when mouse enter.</span>
        </Tooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
