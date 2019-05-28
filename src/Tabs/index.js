import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntTabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme';

const MtTabs = styled.div`
  .ant-tabs {
    font-family: inherit;
  }
  .ant-tabs-bar {
    font-family: inherit;
    border-bottom: 1px solid #e7e8ec;
    margin-bottom: 40px;
  }
  .ant-tabs-nav {
    .ant-tabs-tab {
      font-weight: 600;
      color: ${theme.colors.OUTER_SPACE};
      margin: 0 1px 0 0;
      padding: 12px 10px;
    }
  }
  .ant-tabs-nav {
    .ant-tabs-tab {
      &:hover {
        color: ${theme.colors.SHARK};
      }
    }
    .ant-tabs-tab-active {
      color: ${theme.colors.SHARK};
    }
  }
  .ant-tabs-content > .ant-tabs-tabpane {
    padding: 0 10px;
  }
`;

class Tabs extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    activeKey: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string
  };

  render() {
    let { options, className, onChange } = this.props;
    return (
      <MtTabs>
        <AntTabs
          defaultActiveKey={this.props.activeKey}
          className={className}
          onChange={onChange}
        >
          {options.map(option => {
            return (
              <AntTabs.TabPane tab={option.title} key={option.key}>
                {option.content}
              </AntTabs.TabPane>
            );
          })}
        </AntTabs>
      </MtTabs>
    );
  }
}
export default Tabs;
