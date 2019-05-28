import React from 'react';
import renderer from 'react-test-renderer';
import Collapse from './index';

describe('Collapse', () => {
  it('matches  default snapshot', () => {
    const options = [
      { header: 'This is panel header 1', content: ['First Item'] },
      { header: 'This is panel header 2', content: '<b>Second Item</b>' },
      { header: 'This is panel header 3', content: 'Third Item' }
    ];
    const tree = renderer.create(<Collapse options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
