import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CheckBox from './index';

describe('CheckBox', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<CheckBox label="Checkbox" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle click', () => {
    const stopPropagation = jest.fn();
    const checkBox = shallow(<CheckBox />);
    checkBox.find('Checkbox').simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
  });
});
