import React from 'react';
import PropTypes from 'prop-types';
import 'antd/lib/button/style/index.css';
import styled from 'styled-components';
import mixins from '../styles/mixins.js';

const MtActionBar = styled.div`
  position: ${({ position = 'fixed' }) => position};
  max-width: 100vw;
  bottom: 0;
  width: ${({ width = '1248px' }) => width};
  z-index: ${({ zIndex }) => zIndex};
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  padding: 16px 32px;
  box-shadow: 0 -1px 0 0 #e7e8ec, 0 -2px 4px 0 rgba(0, 0, 0, 0.08);
  .countText {
    ${mixins.blackLink()};
    margin-right: 29px;
  }
  animation-name: fade-in;
  animation-duration: 0.2s;

  @keyframes fade-in {
    0% {
      padding: 0 32px;
    }

    100% {
      padding: 16px 32px;
    }
  }
`;

const ActionBar = ({ children, countText, style, className }) => {
  return (
    <MtActionBar {...style} className={className}>
      {countText && <span className="countText">{countText}</span>}
      {children}
    </MtActionBar>
  );
};

ActionBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  countText: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ActionBar;
