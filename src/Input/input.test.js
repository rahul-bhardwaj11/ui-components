import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Input from './index';

describe('Input', () => {
  it('matches default snapshot', () => {
    const tree = renderer
      .create(<Input placeholder={'Placeholder'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle click', () => {
    const stopPropagation = jest.fn();
    const input = shallow(<Input placeholder={null} />);
    input.find('Input').simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
  });
});
