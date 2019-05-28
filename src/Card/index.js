import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntCard from 'antd/lib/card';
import styled from 'styled-components';
import 'antd/lib/card/style/index.css';
import mixins from '../styles/mixins';
import theme from '../styles/theme';

const MtCard = styled(AntCard)`
  &.ant-card {
    font-family: inherit;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    padding: 24px;
    .ant-card-head {
      padding: 0 0 12px 0;
      border-bottom: none;
      min-height: auto;
      ${mixins.h3()};
      .ant-card-head-title {
        padding: 0px;
      }
    }
    .ant-card-body {
      padding: 0px;
    }
  }
  .ant-card-bordered {
    background: ${theme.colors.WHITE};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    border: transparent;
  }
  .ant-card-wider-padding {
    .ant-card-head {
      padding: 0 0 12px 0;
    }
    .ant-card-body {
      padding: 0px;
    }
  }
`;
class Card extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children } = this.props;
    return <MtCard {...this.props}>{children}</MtCard>;
  }
}
export default Card;
