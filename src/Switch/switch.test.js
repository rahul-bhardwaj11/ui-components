import React from 'react';
import renderer from 'react-test-renderer';
import Switch from './index';

describe('Switch', () => {
  it('matches default snapshot', () => {
    const tree = renderer.create(<Switch checked={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
