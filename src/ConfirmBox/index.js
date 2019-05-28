import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AntPopconfirm from 'antd/lib/popconfirm';
import 'antd/lib/popconfirm/style/css';
import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';

const StyledPopconfirm = styled.div`
  font-family: inherit;
  .ant-popover {
    z-index: ${mixins.zIndex.CONFIRM_BOX};
  }
  .ant-popover-message-title {
    ${mixins.blackLink()};
    padding-left: 0px;
  }
  .ant-popover-inner-content {
    padding: 24px;
  }
  .ant-popover-message > .anticon {
    display: none;
  }
  .ant-popover-buttons {
    margin-bottom: 0px;
    .ant-btn {
      ${mixins.textBtn()};
      ${mixins.button()};
      color: ${theme.colors.OUTER_SPACE};
      min-width: 75px;

      &.ant-btn-primary {
        ${mixins.primaryBtn()};
        ${mixins.button()};
        color: #fff;
        &:hover {
          ${mixins.primaryBtnHover()};
          color: #fff;
        }
        &:focus,
        &.active {
          ${mixins.primaryBtnHover()};
          color: #fff;
        }
      }
      &:hover,
      &:focus {
        ${mixins.textBtn()};
        color: ${theme.colors.ICON};
      }
    }
  }
`;

class ConfirmBox extends Component {
  static propTypes = {
    children: PropTypes.node,
    placement: PropTypes.string,
    getPopupContainer: PropTypes.func
  };
  confirmContainer = null;
  element = null;
  constructor(p) {
    super(p);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    let { children, getPopupContainer } = this.props;
    const container =
      this.props.getPopupContainer && this.props.getPopupContainer();
    if (!getPopupContainer || getPopupContainer()) {
      return (
        <React.Fragment>
          {ReactDOM.createPortal(
            <StyledPopconfirm
              innerRef={e => e && (this.confirmContainer = e)}
            />,
            container || this.element
          )}
          <AntPopconfirm
            {...this.props}
            getPopupContainer={() => {
              return this.confirmContainer;
            }}
          >
            {children}
          </AntPopconfirm>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ConfirmBox;
