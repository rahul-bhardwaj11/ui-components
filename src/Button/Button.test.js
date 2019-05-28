import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';
import renderer from 'react-test-renderer';

describe('Button', () => {
  var noop = () => undefined;

  it('matches default props snapshot when type is primary', () => {
    const tree = renderer
      .create(
        <Button
          onClick={noop}
          children="Submit"
          disabled={false}
          type="primary"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches default props snapshot when type is default', () => {
    const tree = renderer
      .create(
        <Button
          onClick={noop}
          children="Submit"
          disabled={false}
          type="default"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle click', () => {
    const clickSpy = jest.fn();
    const button = shallow(
      <Button onClick={clickSpy} type="primary" children="submit" />
    );
    button.find('Button').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
