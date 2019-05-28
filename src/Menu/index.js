import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntMenu from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';
import StringToHTML from '../StringToHTML';
import styled from 'styled-components';
import mixins from '../styles/mixins';
import theme from '../styles/theme';

const MtMenu = styled.div`
  .ant-menu {
    font-family: inherit;
  }
  .ant-anchor-wrapper {
    overflow: hidden;
  }
  .ant-select-dropdown-menu-item {
    background-color: ${theme.colors.INDIGO};
    color: ${theme.colors.WHITE};
  }
  .ant-select-dropdown {
    background-color: ${theme.colors.INDIGO};
    color: ${theme.colors.WHITE};
  }
  .ant-select-dropdown-menu {
    background-color: ${theme.colors.WHITE};
    color: ${theme.colors.GREY};
    padding: 0px 5px;
    margin: 8px;
    border-radius: 4px;
    height: 32px;
    line-height: 32px;
  }
  .ant-dropdown-menu {
    padding: 4px 0px;
  }
  .ant-dropdown-menu-item:first-child,
  .ant-dropdown-menu-item:last-child {
    border-radius: 4px;
  }
  .ant-dropdown-menu-submenu-title {
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    &:hover {
      background-color: ${theme.colors.INDIGO};
      color: ${theme.colors.WHITE};
    }
  }
  .ant-dropdown-menu-item {
    background-color: ${theme.colors.WHITE};
    color: ${theme.colors.OUTER_SPACE};
    padding: 0px 15px;
    margin: 4px 8px;
    border-radius: 4px;
    height: 32px;
    line-height: 32px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    &:hover {
      background-color: ${theme.colors.INDIGO};
      color: ${theme.colors.WHITE};
    }
  }
  .ant-menu-horizontal {
    line-height: normal;
    & > .ant-menu-item {
      &:hover {
        color: ${theme.colors.CONGRESS_BLUE};
        border-bottom: 3px solid transparent;
      }
    }
    & > .ant-menu-submenu {
      &:hover {
        color: ${theme.colors.CONGRESS_BLUE};
      }
    }
    & > .ant-menu-item-active,
    & > .ant-menu-submenu-active,
    & > .ant-menu-item-selected,
    & > .ant-menu-submenu-selected {
      color: ${theme.colors.CONGRESS_BLUE};
      border-bottom: 3px solid ${theme.colors.INDIGO};
    }
  }
  .ant-menu-vertical {
    & > .ant-menu-item {
      color: ${theme.colors.OUTER_SPACE};
      padding: 0px;
      margin: 0px;
      text-align: left;
      &:hover {
        color: ${theme.colors.CONGRESS_BLUE};
      }
    }
  }
  .ant-menu-item {
    color: ${theme.colors.OUTER_SPACE};
    padding: 0px 8px;

    &:hover {
      color: ${theme.colors.WHITE};
    }
    b {
      font-weight: normal;
    }
  }
  .ant-dropdown-trigger {
    font-size: 13px;
  }

  & {
    .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      height: auto;
      line-height: 16px;
      margin: 0px 0px 8px 0px;
      color: ${theme.colors.OUTER_SPACE};

      &:hover {
        color: ${theme.colors.OUTER_SPACE};
      }

      .ant-menu-submenu-arrow {
        display: none;
      }
    }
  }
  & {
    .ant-menu-sub.ant-menu-inline > .ant-menu-item {
      float: left;
      text-align: left;
      margin: 0px;
      font-size: 12px;
    }
  }

  .ant-anchor-link {
    padding: 6px 0 6px 0px;
    line-height: 1;
    display: list-item;
    margin-left: 17px;
    list-style-type: disc;
    color: ${theme.colors.INDIGO};

    a {
      color: ${theme.colors.INDIGO};
      font-size: 12px;
      ${mixins.truncate('250px')};
    }
  }
  .ant-menu-inline,
  .ant-menu-light {
    border-right: 0px;
  }
  .cautious {
    color: ${theme.colors.BITTERSWEET};
    &:active {
      background-color: ${theme.colors.BITTERSWEET};
      color: ${theme.colors.WHITE};
    }
    &:hover {
      background-color: ${theme.colors.BITTERSWEET};
      color: ${theme.colors.WHITE};
    }
  }

  .ant-dropdown-menu-item-selected {
    background-color: ${theme.colors.TROPICAL_BLUE};
  }
  .ant-menu-vertical .ant-menu-item:not(:last-child),
  .ant-menu-vertical .ant-menu-item {
    margin-bottom: 0px;
  }
`;
class Menu extends Component {
  static propTypes = {
    options: PropTypes.array,
    onClick: PropTypes.func,
    mode: PropTypes.string,
    children: PropTypes.node,
    prefixCls: PropTypes.string,
    itemStyle: PropTypes.object
  };

  static defaultProps = {
    style: { paddingLeft: '0px' },
    onClick: () => {}
  };

  onClick = ({ key }) => {
    this.props.onClick(key);
  };

  render() {
    let { options, children, itemStyle } = this.props;
    return (
      <MtMenu>
        <AntMenu {...this.props} onClick={this.onClick}>
          {!options && children}
          {options &&
            options.map((option, index) => {
              return (
                <AntMenu.Item
                  key={option.key || index}
                  style={itemStyle}
                  className={option.cautious ? 'cautious' : ''}
                >
                  {typeof option.content === 'string' ? (
                    <StringToHTML content={option.content} />
                  ) : (
                    option.content
                  )}
                </AntMenu.Item>
              );
            })}
        </AntMenu>
      </MtMenu>
    );
  }
}

Menu.ItemGroup = AntMenu.ItemGroup;
Menu.SubMenu = AntMenu.SubMenu;
Menu.Item = AntMenu.Item;
export default Menu;
