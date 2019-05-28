import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import AntPopover from 'antd/lib/popover';
import 'antd/lib/popover/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme.js';
import mixins from '../styles/mixins.js';
const StyledPopover = styled.div`
  position: absolute;
  .ant-popover {
    font-family: inherit;
    z-index: ${mixins.zIndex.POPOVER};
  }
  .ant-popover-title {
    border-bottom: 1px solid transparent;
    padding: 20px 20px 0px 20px;
    font-size: 14px;
  }
  .ant-popover-inner {
    border: 1px solid rgba(205, 210, 217, 0.5);
    border-radius: 4px;
    background-color: ${theme.colors.WHITE};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  }
  .ant-popover-inner-content {
    text-align: left;
    padding: 20px;
    button {
      margin-left: 15px;
    }
  }
`;
class Popover extends Component {
  static propTypes = {
    children: PropTypes.node,
    getPopupContainer: PropTypes.func,
    className: PropTypes.string
  };

  element = null;
  constructor(p) {
    super(p);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    if (!this.props.getPopupContainer || !this.props.getPopupContainer())
      document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    if (!this.props.getPopupContainer) document.body.removeChild(this.element);
  }

  render() {
    const { children, getPopupContainer, className, ...rest } = this.props;
    const container = getPopupContainer && getPopupContainer();
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <StyledPopover
            className={className}
            innerRef={e => (this.popoverContainer = e)}
          />,
          container || this.element
        )}
        <AntPopover getPopupContainer={() => this.popoverContainer} {...rest}>
          {children}
        </AntPopover>
      </React.Fragment>
    );
  }
}

export default Popover;
