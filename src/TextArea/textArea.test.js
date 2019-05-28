import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from './index';

describe('TextArea', () => {
  it('matches default snapshot', () => {
    const tree = renderer
      .create(
        <TextArea placeholder="Enter the scenario description. Example: Record a video directly on MindTickle or upload a pre-recorded video." />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
