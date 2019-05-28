import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Select from './index';

describe('Select', () => {
  const options = [
    { key: '1', content: 'First Item' },
    { key: '2', content: 'Second Item' },
    { key: '3', content: 'Third Item' }
  ];
  it('matches default snapshot', () => {
    const tree = renderer.create(<Select options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  const changeSpy = jest.fn();
  const select = shallow(<Select options={options} onChange={changeSpy} />);
  it('should handle click', () => {
    const stopPropagation = jest.fn();
    select.find('Select').simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
  });

  it('should handle change', () => {
    select.find('Select').simulate('change');
    expect(changeSpy).toHaveBeenCalled();
  });
});
