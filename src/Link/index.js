import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AntAnchor from 'antd/lib/anchor';
import 'antd/lib/anchor/style/index.css';

const MtAnchor = styled.span`
  .ant-anchor-wrapper {
    .ant-anchor {
      display: inline-block;
    }
    .ant-anchor-ink {
      &:before {
        background-color: transparent;
      }
    }
  }
`;

class Link extends Component {
  static propTypes = {
    href: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string
  };

  render() {
    return (
      <MtAnchor>
        <AntAnchor>
          <AntAnchor.Link {...this.props} />
        </AntAnchor>
      </MtAnchor>
    );
  }
}

export default Link;
