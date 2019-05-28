import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Dropdown from './index';

describe('Dropdown', () => {
  const options = [
    { key: '1', content: 'First Item' },
    { key: '2', content: 'Second Item' },
    { key: '3', content: 'Third Item' }
  ];
  it('matches default snapshot', () => {
    const tree = renderer.create(<Dropdown options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches Button Dropdown snapshot', () => {
    const tree = renderer
      .create(<Dropdown options={options} type="button" label={'button'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches Link Dropdown snapshot', () => {
    const tree = renderer
      .create(<Dropdown options={options} trigger={'click'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle click', () => {
    const clickSpy = jest.fn();
    const dropDown = shallow(<Dropdown options={options} onClick={clickSpy} />);
    dropDown.find('Dropdown').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
