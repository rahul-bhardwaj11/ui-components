import React, { Component } from 'react';
import AntInputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme';

const MTInputNumber = styled(AntInputNumber)`
  .ant-input-number-handler-up-inner:before {
    content: '';
  }
  &.ant-input-number-focused {
    border-color: ${theme.colors.SILVER} !important;
    box-shadow: none;
  }
  &.ant-input-number:hover {
    border-color: ${theme.colors.SILVER};
  }
`;

class InputNumber extends Component {
  render() {
    return <MTInputNumber {...this.props} autoFocus={false} />;
  }
}

export default InputNumber;
