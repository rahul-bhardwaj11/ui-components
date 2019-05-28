import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins.js';

export const DEFAULT_TH_PADDING = {
  pTop: '16px',
  pRight: '0',
  pBottom: '16px',
  pLeft: '32px'
};

export const DEFAULT_TD_PADDING = {
  pTop: '12px',
  pRight: '0',
  pBottom: '12px',
  pLeft: '32px'
};

export default styled.div`
  counter-reset: rowNumber;
  position: relative;
  margin-bottom: ${props => (props.showActionBar ? '60px' : '0px')};

  .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    ${mixins.h2()};
    color: #999999;
  }
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
    transform: translate(-50%, -50%);
    height: 64px;
    width: 64px;
    margin: 0px;
    margin-top: 16px;
  }
  .ant-table-placeholder {
    min-height: 60px;
    padding: 0px;
    .emptyTableContainer {
      ${mixins.centerDiv()};
      position: absolute;
    }
    .emptyTableTitle {
      color: #999999;
      font-size: 18px;
      text-align: center;
      font-weight: 600;
    }
    .emptyTableSubtitle {
      color: #999999;
      font-size: 13px;
      text-align: center;
      margin-top: 5px;
    }
  }
  .ant-table {
    font-family: inherit;
  }
  .ant-table-content {
    .ant-table-body > table {
      padding-bottom: ${props => (props.infiniteScroll ? '54px' : '0px')};
    }
  }
  .ant-table-empty .ant-table-content {
    .ant-table-body > table {
      padding-bottom: 0px;
    }
  }

  .ant-table-default > .ant-table-content > .ant-table-body > table,
  .ant-table-middle > .ant-table-content > .ant-table-body > table,
  .ant-table-small > .ant-table-content > .ant-table-body > table,
  .ant-table-default
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-header
    > .ant-table-fixed,
  .ant-table-default
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-body
    > .ant-table-fixed,
  .ant-table-default > .ant-table-content > .ant-table-scroll > .ant-table-body,
  .ant-table-default
    > .ant-table-content
    > .ant-table-scroll
    > .ant-table-header,
  .ant-table-default
    > .ant-table-content
    > .ant-table-fixed-left
    > .ant-table-header
    > .ant-table-fixed,
  .ant-table-default
    > .ant-table-content
    > .ant-table-fixed-left
    > .ant-table-body-outer
    > .ant-table-body-inner
    > .ant-table-fixed,
  .ant-table-default
    > .ant-table-content
    > .ant-table-fixed-right
    > .ant-table-header
    > .ant-table-fixed,
  .ant-table-default
    > .ant-table-content
    > .ant-table-fixed-right
    > .ant-table-body-outer
    > .ant-table-body-inner
    > .ant-table-fixed {
    .ant-table-thead {
      & > tr {
        color: ${theme.colors.DARK_OUTER_SPACE};
        & > th {
          ${mixins.smallDarkLink()};
          background-color: white;
          border-bottom: 1px solid ${theme.colors.ALTO};
          padding: ${props => {
            let {
              headerCellPadding: {
                pTop,
                pRight,
                pBottom,
                pLeft
              } = DEFAULT_TH_PADDING
            } = props;
            return `${pTop} ${pRight} ${pBottom}  ${pLeft}`;
          }};
          &:last-child {
            padding: ${props => {
              let {
                headerCellPadding: { pTop, pBottom, pLeft } = DEFAULT_TH_PADDING
              } = props;
              return `${pTop} ${pLeft} ${pBottom}  ${pLeft}`;
            }};
          }
          span {
          }
          &:hover {
            &.ant-table-column-has-filters .ant-table-column-sorter {
              visibility: visible;
            }
          }
          .ant-table-column-sorter-up:hover .anticon,
          .ant-table-column-sorter-down:hover .anticon {
            color: ${theme.colors.GREY};
          }
          &.ant-table-column-has-filters .ant-table-column-sorter {
            visibility: hidden;
          }
          .ant-table-column-sorter > .ant-table-column-sorter-down {
            margin-top: 0;
          }
          &.ant-table-column-has-filters.ant-table-column-sort
            .ant-table-column-sorter {
            visibility: visible;
          }
        }
      }
    }
    .ant-table-tbody {
      .row-disabled {
        opacity: 0.4;
      }
      & > tr {
        color: ${theme.colors.DARK_OUTER_SPACE};
        & > td {
          ${mixins.darkText()};
          background-color: white;
          border-bottom: 1px solid ${theme.colors.PEARL};
          padding: ${props => {
            let {
              contentCellPadding: {
                pTop,
                pRight,
                pBottom,
                pLeft
              } = DEFAULT_TD_PADDING
            } = props;
            return `${pTop} ${pRight} ${pBottom} ${pLeft}`;
          }};
          &:last-child {
            padding: ${props => {
              let {
                contentCellPadding: {
                  pTop,
                  pBottom,
                  pLeft
                } = DEFAULT_TD_PADDING
              } = props;
              return `${pTop} ${pLeft} ${pBottom} ${pLeft}`;
            }};
          }
        }
      }
    }

    .ant-table-row {
      counter-increment: rowNumber;
      &:hover {
        .ant-table-selection-column {
          ${props =>
            !props.showMultiSelect &&
            `&:before {
              visibility: hidden;
            }
            & > span {
              visibility: visible;
            }`};
        }
      }
    }

    .ant-table-tbody {
      counter-reset: rowNumber;
      .ant-table-selection-column {
        ${props =>
          !props.showMultiSelect &&
          `&:before {
            content: counter(rowNumber);
            margin-left: 5px;
            position: absolute;
            color: ${theme.colors.OUTER_SPACE};
            font-size: 12px;
          }
          & > span {
            visibility: hidden;
          }`};
      }
      & > tr {
        color: ${theme.colors.DARK_OUTER_SPACE};
        &:focus-within {
          & > td {
            background: ${theme.colors.PORCELAIN};
          }
        }
        td {
          ${mixins.darkText()};
          border-bottom: 1px solid ${theme.colors.PEARL};
          padding: ${props => {
            let {
              contentCellPadding: {
                pTop,
                pRight,
                pBottom,
                pLeft
              } = DEFAULT_TD_PADDING
            } = props;
            return `${pTop} ${pRight} ${pBottom} ${pLeft}`;
          }};
          &:last-child {
            padding: ${props => {
              let {
                contentCellPadding: {
                  pTop,
                  pBottom,
                  pLeft
                } = DEFAULT_TD_PADDING
              } = props;
              return `${pTop} ${pLeft} ${pBottom} ${pLeft}`;
            }};
          }
        }
        &.ant-table-row-selected {
          & > td {
            background: ${theme.colors.TROPICAL_BLUE};
          }
          &:hover {
            & > td {
              background: ${theme.colors.TROPICAL_BLUE};
            }
          }
        }
        &.ant-table-row-hover {
          & > td {
            background: ${theme.colors.PORCELAIN};
          }
          &:hover {
            & > td {
              background: ${theme.colors.PORCELAIN};
            }
          }
        }
        &:hover {
          & > td {
            background: ${theme.colors.PORCELAIN};
          }
        }
      }
    }
  }
  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column {
    min-width: auto;
  }

  .ant-checkbox-wrapper {
    &:hover .ant-checkbox-inner {
      border-color: ${theme.colors.INDIGO};
    }
    & .ant-checkbox > .ant-checkbox-inner {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      transition: none;
      &:after {
        left: 3.5px;
        top: 1.2px;
      }
    }
    .ant-checkbox-disabled {
      .ant-checkbox-inner {
        border: 1px solid ${theme.colors.ALTO};
        background-color: ${theme.colors.PEARL};
      }
    }
    & > .ant-checkbox-checked {
      &.ant-checkbox-disabled {
        & > .ant-checkbox-inner {
          border: 1px solid ${theme.colors.ALTO};
          background-color: ${theme.colors.PEARL};
        }
      }
      & > .ant-checkbox-inner {
        background-color: ${theme.colors.INDIGO};
        border-color: ${theme.colors.INDIGO};
        &:after {
          left: 3.5px;
          top: 1.2px;
        }
      }
    }

    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: ${theme.colors.INDIGO};
    }

    .ant-checkbox-indeterminate .ant-checkbox-inner:after {
      content: ' ';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 9.14285714px;
      height: 2px;
      transform: translate(-50%, -50%) scale(1);
      background-color: #ffffff;
    }
    .ant-checkbox-indeterminate.ant-checkbox-disabled
      .ant-checkbox-inner:after {
      border-color: rgba(0, 0, 0, 0.25);
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner {
      background-color: ${theme.colors.INDIGO};
      border-color: ${theme.colors.INDIGO};
    }
  }
  .ant-table-column-sorter {
    margin-left: 2px;
    margin-top: -4px;
    .anticon-caret-up,
    .anticon-caret-down {
      color: ${theme.colors.ALTO};
    }
  }

  .ant-table-column-sorter-up.on .anticon-caret-up,
  .ant-table-column-sorter-down.on .anticon-caret-up,
  .ant-table-column-sorter-up.on .anticon-caret-down,
  .ant-table-column-sorter-down.on .anticon-caret-down {
    color: ${theme.colors.GREY};
  }
  .loadMoreBtnDiv {
    margin-top: 32px;
    text-align: center;
  }
`;
