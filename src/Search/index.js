import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import 'antd/lib/input/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme';
import Icon from '../Icon';

const MtSearchInput = styled.span`
  .ant-input-affix-wrapper {
    font-family: inherit;
    .ant-input:not(:last-child) {
      padding: 0px 30px 0px 30px;
    }
  }
  .ant-input-search:not(.ant-input-search-small) {
    & > .ant-input-suffix {
      right: 0px;
      left: 12px;
      top: 17px;
      width: 14px;
    }
  }

  .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
    border: 1px solid ${theme.colors.ALTO};
    &:hover {
      border: 1px solid ${theme.colors.SILVER};
    }
  }
  .ant-input {
    color: ${theme.colors.SHARK};
    font-family: inherit;
    font-size: 12px;
    border: 1px solid ${theme.colors.ALTO};
    &:hover {
      border: 1px solid ${theme.colors.SILVER};
    }
    &:focus {
      border: 1px solid ${theme.colors.SILVER};
      box-shadow: none;
    }
  }
  .ant-input-search > .ant-input-prefix > .ant-input-search-icon {
    display: none;
  }
  .icon-search {
    font-size: 12px;
    color: ${theme.colors.ALTO};
  }
  .ant-input-affix-wrapper:focus .icon-search,
  .ant-input-affix-wrapper:active .icon-search,
  .ant-input-affix-wrapper:focus-within .icon-search {
    color: ${theme.colors.GREY};
  }
  .ant-input-affix-wrapper .ant-input-suffix {
    top: 17px;
  }
  .icon-search {
    font-size: 12px;
    font-weight: 600;
    color: ${theme.colors.ICON};
  }
  .icon-close {
    font-size: 10px;
    font-weight: 600;
    color: ${theme.colors.GREY};
    cursor: pointer;
  }
`;

class Search extends Component {
  static propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func
  };
  static defaultProps = {
    onSearch: () => {},
    onPressEnter: () => {}
  };
  state = {
    query: this.props.value || ''
  };

  handleClear = () => {
    this.setState({ query: '' });
    this.props.onPressEnter('');
    this.props.onSearch('');
  };

  handleChange = event => {
    const query = event.target.value;
    const { onSearch } = this.props;
    this.setState({ query });
    onSearch(query);
  };

  handleSearch = event => {
    this.props.onPressEnter(event.target.value);
  };

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.value !== 'undefined' &&
      nextProps.value !== this.state.query
    ) {
      this.setState({
        query: nextProps.value
      });
    }
  }

  render() {
    const { query } = this.state;
    const { onSearch, ...rest } = this.props; //eslint-disable-line
    const inputProps = {
      ...rest,
      onChange: this.handleChange,
      onPressEnter: this.handleSearch,
      prefix: <Icon type="search" />,
      suffix: query && <Icon type="close" onClick={this.handleClear} />,
      value: query
    };
    return (
      <MtSearchInput>
        <Input {...inputProps} />
      </MtSearchInput>
    );
  }
}
export default Search;
