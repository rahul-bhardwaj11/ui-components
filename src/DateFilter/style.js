import styled from 'styled-components';
import mixins from '../styles/mixins';
import theme from '../styles/theme';

const DateFilterStyle = styled.div`
  .ant-dropdown-trigger {
    position: relative;
  }

  .ant-dropdown-trigger + div {
    position: relative !important;
  }

  .dateInput {
    display: ${props => (props.mobile ? 'none' : 'block')};
    position: relative;
    min-width: 180px;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
    &.dateNotSelected {
      background-color: ${theme.colors.WHITE};
      border: 1px solid ${theme.colors.SILVER};
    }
    &.dateSelected {
      font-weight: 600;
      color: ${theme.colors.INDIGO};
      background-color: ${theme.colors.TROPICAL_BLUE};
      border: 1px solid ${theme.colors.OCEAN};
      .dateCaret {
        color: ${theme.colors.INDIGO};
      }
    }
    &.dropdownOpen {
      .datePlaceholder {
        color: ${theme.colors.SILVER};
      }
      .dateCaret {
        color: ${theme.colors.DARK_OUTER_SPACE};
      }
    }
  }

  .dateRangeDropdown {
    top: 32px !important;
    left: 0 !important;
  }
  .dateCaret {
    padding: 4px 0;
    margin-left: 10px;
    float: right;
    color: ${theme.colors.SILVER};
    font-size: 10px;
  }
  .ant-calendar-input-wrap {
    display: none;
  }

  .ant-calendar-selected-date,
  .ant-calendar-selected-start-date,
  .ant-calendar-selected-end-date {
    .ant-calendar-date {
      background: ${theme.colors.INDIGO};
      &:hover {
        background: ${theme.colors.INDIGO};
      }
    }
  }

  .ant-calendar-range .ant-calendar-in-range-cell:before {
    background: ${theme.colors.PORCELAIN};
  }

  @media only screen and (max-width: 767px) {
    .ant-dropdown {
      position: relative;

      .ant-dropdown-menu {
        box-shadow: none;
        background-color: transparent;

        .ant-dropdown-menu-item {
          height: 36px;
          padding: 8px 0;
          margin: 0;
          line-height: 36px;
          background-color: transparent;
          ${mixins.greyLink()};

          div {
            line-height: 20px;
          }

          &:hover {
            color: ${theme.colors.OUTER_SPACE};
            background-color: transparent;
          }
        }
      }
    }

    .dateRangeDropdown {
      position: fixed;
      top: 0 !important;
      left: 0 !important;
      width: 100%;
      height: 100%;
      padding: 8px;
      background-color: rgba(0, 0, 0, 0.2);

      .ant-calendar {
        display: table;
        height: 100%;
        margin: 0 auto;
        background-color: transparent;
        border: none;
        box-shadow: none;

        .ant-calendar-panel {
          display: table-cell;
          vertical-align: middle;

          .ant-calendar-date-panel {
            background: ${theme.colors.WHITE};
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
        }
      }
    }
  }
`;

export default DateFilterStyle;
