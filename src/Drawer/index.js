import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntDrawer from 'antd/lib/drawer';
import styled from 'styled-components';
import 'antd/lib/drawer/style/index.css';
import mixins from '../styles/mixins';
import theme from '../styles/theme';

const MtDrawer = styled(AntDrawer)`
  .ant-drawer-header {
    ${mixins.h2()};
    padding: 24px 32px;
    border-bottom: 1px solid ${theme.colors.PEARL};
  }
  .ant-drawer-close-x {
    width: 16px;
    height: 16px;
    line-height: 16px;
    margin: 24px 32px;
    font-size: 16px;
    color: ${theme.colors.ICON};
  }
  .ant-drawer-body {
    padding: 24px 32px;
  }
`;

class Drawer extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children } = this.props;
    return <MtDrawer {...this.props}>{children}</MtDrawer>;
  }
}
export default Drawer;
