import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Menu from '../Menu';
import Layout from '../Layout';

const { Item, ItemGroup: Group, SubMenu } = Menu;
const { Sider } = Layout;

const renderItems = items => {
  //eslint-disable-next-line
  return items.map(({ type, children = [], title, key, scroll, ...rest }) => {
    switch (type) {
      case 'Group':
        return (
          <Group {...rest} title={title} key={key}>
            {renderItems(children)}
          </Group>
        );
      case 'SubMenu':
        return (
          <SubMenu {...rest} title={title} key={key}>
            {renderItems(children)}
          </SubMenu>
        );
      case 'Item':
        return (
          <Item {...rest} key={key}>
            <span>{title}</span>
          </Item>
        );
      default:
        break;
    }
  });
};

const SiderWrapper = ({
  items,
  width,
  className,
  siderPropsToPass,
  menuPropsToPass,
  preMenuContent,
  postMenuContent
}) => {
  return (
    <Sider
      {...siderPropsToPass}
      width={width}
      className={classnames('siderStyling', className)}
    >
      {preMenuContent}
      <Menu theme="dark" mode="inline" inlineIndent={20} {...menuPropsToPass}>
        {renderItems(items)}
      </Menu>
      {postMenuContent}
    </Sider>
  );
};

SiderWrapper.propTypes = {
  items: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  siderPropsToPass: PropTypes.object,
  menuPropsToPass: PropTypes.object,
  preMenuContent: PropTypes.element,
  postMenuContent: PropTypes.element
};

export default SiderWrapper;
