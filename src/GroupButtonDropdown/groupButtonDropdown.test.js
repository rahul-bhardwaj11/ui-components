import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GroupButtonDropdown from './index';

describe('GroupButtonDropdown', () => {
  const options = [
    { key: '1', content: 'First Item' },
    { key: '2', content: 'Second Item' },
    { key: '3', content: 'Third Item' }
  ];
  it('matches default snapshot', () => {
    const tree = renderer
      .create(<GroupButtonDropdown options={options} label="ADD" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should handle click', () => {
    const clickSpy = jest.fn();
    const groupButtonDropdown = shallow(
      <GroupButtonDropdown
        options={options}
        trigger="click"
        onClick={clickSpy}
      />
    );
    groupButtonDropdown.find('Dropdown').simulate('click', { key: '1' });
    expect(clickSpy).toHaveBeenCalled();
  });
});
