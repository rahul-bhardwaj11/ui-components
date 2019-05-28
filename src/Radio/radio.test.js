import React from 'react';
import renderer from 'react-test-renderer';
import Radio from './index';

describe('Radio', () => {
  it('matches default snapshot', () => {
    const tree = renderer.create(<Radio children="Radio" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
