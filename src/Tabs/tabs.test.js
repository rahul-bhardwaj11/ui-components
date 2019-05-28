import React from 'react';
import { shallow } from 'enzyme';
//import renderer from 'react-test-renderer';
import Tabs from './index';

describe('Tabs', () => {
  jest.mock('rc-tabs', () => {});
  const options = [
    { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    { title: 'Tab 3', content: 'Content of Tab 3', key: '3' }
  ];
  // it('matches default snapshot',()=>{
  //   const tree =renderer.create(
  //     <Tabs
  //       options = {options}
  //     />
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // })
  it('should handle change', () => {
    const changeSpy = jest.fn();
    const tabs = shallow(<Tabs options={options} onChange={changeSpy} />);
    tabs.find('Tabs').simulate('change', { activeKey: null });
    expect(changeSpy).toHaveBeenCalled();
  });
});
