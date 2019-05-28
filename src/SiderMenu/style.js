import styled from 'styled-components';
import theme from '../styles/theme.js';

export default styled.div`
  .siderStyling {
    background: ${theme.colors.CONGRESS_BLUE};
    background: linear-gradient(
      90deg,
      ${theme.colors.CONGRESS_BLUE} 0%,
      #262b43 100%
    );

    &.ant-layout-sider {
      transition: all 0.3s;
    }

    .ant-menu {
      padding: 20px 0 4px 0;

      &.ant-menu-dark {
        background: ${theme.colors.CONGRESS_BLUE};
        background: linear-gradient(
          90deg,
          ${theme.colors.CONGRESS_BLUE} 0%,
          #262b43 100%
        );
        transition: none !important;
      }
    }

    .ant-menu-item {
      font-size: 14px;
      line-height: 20px;

      &.ant-menu-item-active {
        background-color: #29364a;
        background-color: linear-gradient(90deg, #29364a 0%, #313757 100%);
      }

      &.ant-menu-item-selected {
        font-weight: 600;
        color: white;
        background-color: #29364a;
        background-color: linear-gradient(90deg, #29364a 0%, #313757 100%);
      }
    }

    .ant-menu-vertical > .ant-menu-item,
    .ant-menu-vertical-left > .ant-menu-item,
    .ant-menu-vertical-right > .ant-menu-item,
    .ant-menu-inline > .ant-menu-item,
    .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
      height: auto;
      padding: 8px 20px;
    }

    .ant-menu-item-group-list .ant-menu-item {
      height: auto;
      padding: 8px 20px;
    }

    .ant-menu-vertical .ant-menu-item:not(:last-child),
    .ant-menu-vertical-left .ant-menu-item:not(:last-child),
    .ant-menu-vertical-right .ant-menu-item:not(:last-child),
    .ant-menu-inline .ant-menu-item:not(:last-child) {
      margin-bottom: 0;
    }

    .ant-menu-item-group-title {
      padding-top: 32px;
      padding-bottom: 8px;
      font-size: 11px;
      font-weight: 600;
      line-height: 16px;
      color: ${theme.colors.MANATEE};
    }
  }

  .userDefinedItems {
    &.ant-layout-sider {
      transition: all 0.3s;
    }

    .ant-menu {
      padding: 0 0 10px 0;
    }

    .ant-menu-item-group-title {
      display: none;
    }
  }
`;
