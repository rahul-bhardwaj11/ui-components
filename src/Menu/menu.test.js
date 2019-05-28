import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Menu from './index';

describe('Menu', () => {
  const options = [
    { key: '1', content: '<b>First Item</b>' },
    { key: '2', content: 'Second Item' },
    { key: '3', content: 'Third Item' }
  ];
  it('matches default snapshot', () => {
    const tree = renderer
      .create(<Menu options={options} mode="horizontal" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches Vertical Menu snapshot', () => {
    const tree = renderer
      .create(<Menu options={options} mode="vertical" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle click', () => {
    const clickSpy = jest.fn();
    const menu = shallow(<Menu options={options} onClick={clickSpy} />);
    menu.find('Menu').simulate('click', { key: '1' });
    expect(clickSpy).toHaveBeenCalled();
  });
});
