import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AntTooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';
import mixins from '../styles/mixins.js';
import ReactDOM from 'react-dom';

const MtTooltip = styled.div`
  display: inline-block;
  .ant-tooltip-inner {
    min-height: unset;
    padding: 4px 8px 6px;
    ${mixins.smallInactiveLink()};
    color: #ffffff;
    font-weight: 600;
    background-color: #000000;
  }
  .ant-tooltip {
    z-index: ${({ style = {} }) =>
      style.zIndex ? style.zIndex : mixins.zIndex.TOOLTIP};
    ${({ style = {} }) => (style.left ? `left: ${style.left} !important` : '')};
  }
`;
class Tooltip extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    className: PropTypes.string,
    getPopupContainer: PropTypes.func,
    style: PropTypes.object
  };

  popUpContainer = null;
  element = null;
  constructor(p) {
    super(p);
    this.element = document.createElement('div');
    this.element.style.height = 0;
    this.element.style.lineHeight = 0;
  }

  static defaultProps = {
    style: {}
  };

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  getRef = () => {
    return this.popUpContainer;
  };

  render() {
    const { children, className, getPopupContainer, style } = this.props;
    const container = getPopupContainer && getPopupContainer();
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <MtTooltip
            style={style}
            className={className}
            innerRef={e => e && (this.popUpContainer = e)}
          />,
          container || this.element
        )}
        <MtTooltip className={className} innerRef={this.getRef}>
          <AntTooltip
            {...this.props}
            getPopupContainer={() => {
              return this.popUpContainer;
            }}
          >
            {children}
          </AntTooltip>
        </MtTooltip>
      </React.Fragment>
    );
  }
}

export default Tooltip;
