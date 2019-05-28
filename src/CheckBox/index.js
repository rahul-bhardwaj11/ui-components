import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AntCheckbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';

const noop = () => undefined;

const MtCheckbox = styled(AntCheckbox)`
  &.ant-checkbox-wrapper {
    font-family: inherit;
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: ${theme.colors.INDIGO};
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner:after {
      content: ' ';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 9.14285714px;
      height: 2px;
      transform: translate(-50%, -50%) scale(1);
      background-color: #ffffff;
    }
    .ant-checkbox-indeterminate.ant-checkbox-disabled
      .ant-checkbox-inner:after {
      border-color: rgba(0, 0, 0, 0.25);
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner {
      background-color: ${theme.colors.INDIGO};
      border-color: ${theme.colors.INDIGO};
    }
  }
  &.ant-checkbox-wrapper {
    font-weight: normal;
    &:hover {
      .ant-checkbox-inner {
        border-color: ${theme.colors.INDIGO};
      }
    }
    .checkBoxLabel {
      ${props =>
        props.checked ? `${mixins.blackLink()}` : `${mixins.greyLink()}`};
    }

    .ant-checkbox {
      display: inline-block;
      vertical-align: middle;
    }
    .ant-checkbox + span {
      min-width: 125px;
    }

    .ant-checkbox-inner {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      border: 1px solid ${theme.colors.ALTO};
      &:after {
        left: 3.5px;
        top: 1.2px;
      }
    }
    .ant-checkbox-disabled {
      .ant-checkbox-inner {
        border: 1px solid ${theme.colors.ALTO};
        background-color: ${theme.colors.PEARL};
      }
    }
    .ant-checkbox-checked {
      &.ant-checkbox-disabled {
        .ant-checkbox-inner {
          border: 1px solid ${theme.colors.ALTO};
          background-color: ${theme.colors.PEARL};
        }
      }
      & > .ant-checkbox-inner {
        background-color: ${theme.colors.INDIGO};
        border-color: ${theme.colors.INDIGO};
      }
    }
  }
`;

class CheckBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    onChange: noop
  };

  state = {
    checked: this.props.checked
  };

  onChange = event => {
    event.stopPropagation();
    const isChecked = !this.state.checked;
    this.setState({ checked: isChecked });
    this.props.onChange(isChecked);
  };

  componentWillReceiveProps(nextProps) {
    let { checked } = this.state;
    if (checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    const { children, indeterminate, disabled, className } = this.props;
    return (
      <MtCheckbox
        checked={this.state.checked}
        onChange={this.onChange}
        className={className}
        disabled={disabled}
        indeterminate={indeterminate}
      >
        <span onClick={e => e.stopPropagation()} className="checkBoxLabel">
          {children}
        </span>
      </MtCheckbox>
    );
  }
}
export default CheckBox;
