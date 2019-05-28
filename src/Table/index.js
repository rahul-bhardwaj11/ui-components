import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntTable from 'antd/lib/table';
import 'antd/lib/table/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/spin/style/index.css';
import ActionBar from '../ActionBar';
import Loader from '../Loader';
import Button from '../Button';
import MtTable from './style';
import classnames from 'classnames';

class Table extends Component {
  static propTypes = {
    children: PropTypes.node,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    emptyTableData: PropTypes.node,
    emptyTableMsg: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string
    }),
    actionBar: PropTypes.shape({
      countText: PropTypes.string.isRequired,
      actionItem: PropTypes.arrayOf(PropTypes.node)
    }),
    onChange: PropTypes.func,
    rowSelection: PropTypes.object,
    columns: PropTypes.array,
    size: PropTypes.string,
    headerCellPadding: PropTypes.shape({
      pTop: PropTypes.string,
      pRight: PropTypes.string,
      pBottom: PropTypes.string,
      pLeft: PropTypes.string
    }),
    contentCellPadding: PropTypes.shape({
      pTop: PropTypes.string,
      pRight: PropTypes.string,
      pBottom: PropTypes.string,
      pLeft: PropTypes.string
    }),
    fetchData: PropTypes.func,
    infiniteScroll: PropTypes.bool,
    threshold: PropTypes.number,
    windowScroll: PropTypes.bool,
    hasMore: PropTypes.bool,
    scroll: PropTypes.object,
    dataSource: PropTypes.array,
    selectedRowKeys: PropTypes.array,
    isMultiSelect: PropTypes.bool,
    selectRowClassName: PropTypes.string,
    loading: PropTypes.bool,
    isLoadMore: PropTypes.bool,
    onRow: PropTypes.func,
    freeze: PropTypes.shape({
      isFreezed: PropTypes.bool.isRequired,
      freezeMsg: PropTypes.string
    }),
    locale: PropTypes.object,
    className: PropTypes.string
  };
  static defaultProps = {
    infiniteScroll: false,
    threshold: 0.9,
    windowScroll: false,
    size: 'default',
    isMultiSelect: false,
    emptyTableMsg: { title: 'No Results Found.', subtitle: '' },
    freeze: { isFreezed: false, freezeMsg: '' },
    loading: false
  };
  state = {
    selectedRowKeys: [],
    loadingMore: false
  };
  scrollElement = null;
  styleProps = {
    contentCellPadding: this.props.contentCellPadding,
    headerCellPadding: this.props.headerCellPadding
  };
  tableRef = null;

  fetch = () => {
    const { fetchData, loading } = this.props;
    const { loadingMore } = this.state;
    if (loading || loadingMore) {
      return;
    }
    this.setState({ loadingMore: true }, () => {
      if (typeof fetchData === 'function') {
        const promise = fetchData();
        if (promise && typeof promise.then === 'function') {
          promise
            .then(() => {
              this.setState({ loadingMore: false });
            })
            .catch(() => this.setState({ loadingMore: false }));
        }
      }
    });
  };
  onScroll = () => {
    const {
      hasMore,
      threshold,
      infiniteScroll,
      windowScroll,
      scroll
    } = this.props;
    const body = document.body,
      html = document.documentElement;
    const height = windowScroll
      ? Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        )
      : Math.max(
          this.scrollElement.scrollHeight,
          this.scrollElement.clientHeight
        );

    const innerHeight = windowScroll
      ? window.innerHeight + window.scrollY
      : scroll.y + this.scrollElement.scrollTop;

    if (innerHeight >= height * threshold) {
      if (infiniteScroll && hasMore) {
        this.fetch();
      }
    }
  };
  componentDidMount() {
    const { infiniteScroll, windowScroll } = this.props;
    if (infiniteScroll && this.tableRef) {
      this.scrollElement = windowScroll
        ? window
        : this.tableRef.getElementsByClassName('ant-table-body')[0];
      if (this.scrollElement) {
        this.scrollElement.addEventListener('scroll', this.onScroll, false);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        loadingMore: !nextProps.loading ? false : this.state.loadingMore
      });
    }
  }

  componentWillUnmount() {
    const { infiniteScroll } = this.props;
    if (infiniteScroll && this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.onScroll, false);
    }
  }

  onChange = (selectedRowKeys, selectedRows) => {
    let { rowSelection: { onChange } = {} } = this.props;
    this.setState(() => ({ selectedRowKeys: selectedRowKeys }));
    onChange && onChange(selectedRowKeys, selectedRows);
  };

  getLoader = () => {
    const { loadingMore } = this.state;
    const loaderProps = loadingMore
      ? {
          size: 'sizeXSmall',
          style: {
            padding: '12px 0px',
            backgroundColor: '#ffffff',
            position: 'absolute',
            width: '100%',
            bottom: '0'
          }
        }
      : {
          style: {
            opacity: '0.5',
            backgroundColor: 'transparent'
          }
        };

    return <Loader {...loaderProps} />;
  };
  // componentDidUpdate() {
  //   const { selectAll, selectedRowKeys } = this.state;
  //   const { dataSource, rowKey = "key" } = this.props;
  //   if (selectAll && selectedRowKeys.length !== dataSource.length) {
  //     this.onChange(dataSource.map(v => v[rowKey]), dataSource);
  //   }
  // }

  getEmptyData = () => {
    const {
      emptyTableMsg: { title, subtitle },
      emptyTableData
    } = this.props;

    return emptyTableData ? (
      emptyTableData
    ) : (
      <div className="emptyTableContainer">
        <div className="emptyTableTitle">{title}</div>
        {subtitle && <div className="emptyTableSubtitle">{subtitle}</div>}
      </div>
    );
  };
  getLoadingProp = () => {
    const { loadingMore } = this.state;
    const { loading, freeze } = this.props;

    return freeze.isFreezed
      ? {
          indicator: <React.Fragment />,
          tip: freeze.freezeMsg,
          spinning: freeze.isFreezed
        }
      : {
          indicator:
            loading && !loadingMore ? this.getLoader() : <React.Fragment />,
          spinning: loading && !loadingMore
        };
  };
  getAntTableProps = () => {
    let {
      rowSelection,
      selectedRowKeys: parentKeys,
      isMultiSelect,
      rowKey = 'key',
      onRow,
      locale
    } = this.props;
    let { selectedRowKeys } = this.state;
    const newSelectedRowskey = parentKeys || selectedRowKeys;

    const updatedRowSelection = rowSelection
      ? {
          ...rowSelection,
          onChange: this.onChange,
          selectedRowKeys: newSelectedRowskey
        }
      : null;

    let antProps;
    if (updatedRowSelection && isMultiSelect) {
      antProps = {
        ...this.props,
        rowSelection: updatedRowSelection
      };
    } else if (
      rowSelection &&
      typeof rowSelection.onChange === 'function' &&
      !isMultiSelect
    ) {
      antProps = {
        ...this.props,
        rowSelection: null,
        onRow: record => {
          const rowObject = onRow ? onRow(record) : {};
          return {
            onClick: () => {
              rowObject.onClick && rowObject.onClick(record);
              if (!(rowObject.isDisabled && rowObject.isDisabled())) {
                this.onChange([record[rowKey]], [record]);
              }
            },
            className: newSelectedRowskey.some(v => v === record[rowKey])
              ? classnames(
                  'ant-table-row-selected',
                  this.props.selectRowClassName,
                  { 'row-disabled': rowObject.isDisabled }
                )
              : !(rowObject.isDisabled && rowObject.isDisabled())
                ? ''
                : classnames({ 'row-disabled': true })
          };
        }
      };
    } else {
      antProps = { ...this.props };
    }

    return {
      antTableProps: {
        ...antProps,
        locale: {
          ...locale,
          emptyText: this.getEmptyData()
        },
        loading: this.getLoadingProp()
      },
      newSelectedRowskey
    };
  };
  render() {
    let {
      actionBar,
      children,
      infiniteScroll,
      isLoadMore,
      hasMore
    } = this.props;
    let { loadingMore } = this.state;
    const { antTableProps, newSelectedRowskey } = this.getAntTableProps();
    const showActionBar = actionBar && newSelectedRowskey.length > 0;
    return (
      <MtTable
        innerRef={ele => (this.tableRef = ele)}
        showMultiSelect={newSelectedRowskey.length > 0}
        {...this.styleProps}
        infiniteScroll={infiniteScroll}
        showActionBar={showActionBar}
        className={classnames(this.props.className, 'tableContainer')}
      >
        <AntTable {...antTableProps}>{children}</AntTable>
        {loadingMore && this.getLoader()}
        {showActionBar && (
          <ActionBar {...actionBar}>
            {actionBar ? actionBar.actionItem : false}
          </ActionBar>
        )}
        {isLoadMore &&
          hasMore && (
            <div className="loadMoreBtnDiv">
              <Button type="secondary" size="medium" onClick={this.fetch}>
                Load More
              </Button>
            </div>
          )}
      </MtTable>
    );
  }
}
Table.Column = AntTable.Column;
export default Table;
