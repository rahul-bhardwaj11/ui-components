import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntCollapse from 'antd/lib/collapse';
import 'antd/lib/collapse/style/index.css';
import StringToHTML from '../StringToHTML';
import styled from 'styled-components';
import theme from '../styles/theme';

const MtCollapse = styled.div`
  .ant-collapse {
    font-family: inherit;
    border: 0px;
    border-radius: 0px;
    background: transparent;
  }
  .ant-collapse {
    & > .ant-collapse-item {
      &:last-child {
        border-radius: 0px;
      }
    }
    & > .ant-collapse-item {
      &:last-child {
        & > .ant-collapse-header {
          border-radius: 0px;
        }
      }
    }
  }
  .ant-collapse-header {
    font-weight: bold;
    background: ${theme.colors.WHITE};
  }
  .ant-collapse {
    & > .ant-collapse-item {
      & > .ant-collapse-header {
        .arrow {
          font-size: 0px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 7px solid ${theme.colors.OUTER_SPACE};
          border-radius: 2px;
          margin-bottom: 20px;
          position: absolute;
          left: 91%;
          transform: rotate(-90deg);
        }
      }
    }
  }
  .ant-collapse {
    & > .ant-collapse-item {
      & > .ant-collapse-header[aria-expanded='true'] {
        .arrow {
          transform: rotate(0deg);
          position: absolute;
          left: 91%;
        }
      }
    }
  }

  .ant-collapse-content {
    border-top: 1px;
  }
`;

class Collapse extends Component {
  static propTypes = {
    options: PropTypes.any.isRequired,
    accordion: PropTypes.bool,
    panelStyle: PropTypes.object
  };

  render() {
    let { options, panelStyle } = this.props;
    return (
      <MtCollapse>
        <AntCollapse defaultActiveKey={['0']} {...this.props}>
          {options.map((option, index) => {
            return (
              <AntCollapse.Panel
                key={option.value || index}
                header={option.header}
                style={panelStyle}
                className={option.className}
                forceRender={option.forceRender}
              >
                {typeof option.content === 'string' ? (
                  <StringToHTML content={option.content} />
                ) : (
                  option.content
                )}
              </AntCollapse.Panel>
            );
          })}
        </AntCollapse>
      </MtCollapse>
    );
  }
}
Collapse.Panel = AntCollapse.Panel;
export default Collapse;
