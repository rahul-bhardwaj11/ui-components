import React from 'react';
import renderer from 'react-test-renderer';
import Tree from './index';

describe('Tree', () => {
  it('matches default snapshot', () => {
    const treeData = [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0'
          },
          {
            title: '0-0-1',
            key: '0-0-1'
          }
        ]
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          {
            title: '0-1-0',
            key: '0-1-0'
          }
        ]
      },
      { title: '0-2', key: '0-2' }
    ];
    const onChange = jest.fn();
    const tree = renderer
      .create(<Tree treeData={treeData} onChange={onChange} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
