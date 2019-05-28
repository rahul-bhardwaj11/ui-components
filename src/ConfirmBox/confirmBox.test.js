import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmBox from './index';

describe('ConfirmBox', () => {
  it('matches default snapshot', () => {
    const tree = renderer
      .create(<ConfirmBox title="This is test title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
