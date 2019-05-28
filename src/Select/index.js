import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/lib/dropdown/style/css';
import AntSelect from 'antd/lib/select';
import 'antd/lib/select/style/index.css';
import styled from 'styled-components';
import selectArrowIcon from '../styles/icons/downFillcaret.svg';
import StringToHTML from '../StringToHTML';
import classnames from 'classnames';
import theme from '../styles/theme';
import Icon from '../Icon';
const Option = AntSelect.Option;
import ReactDOM from 'react-dom';

const MtWrapper = styled.span`
  .selectDropdownStyle {
    z-index: 999999;
    .ant-select-dropdown-menu-item {
     div {
         width: ${props => (props.showTick ? '95%' : null)};
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
       }
     }
   }

  .ant-select-dropdown-menu-item-disabled{
    opacity:0.3;
    pointer-events: none;
  }

  .icon-tick {
    display: none;
  }
  .ant-select, .ant-select-dropdown{
    font-family: inherit;
  }
  .ant-select-arrow {
    display: block;
    background: url('${selectArrowIcon}') no-repeat 1px 4px;
    background-size: 8px;
    width: 9px;
    height: 9px;
    &::before {
      content: '';
    }
    svg{
      display:none;
    }
  }
  .ant-select-selection {
    &.ant-select-selection--single {
      border: 1px solid ${theme.colors.ALTO};
      &:hover {
        border: 1px solid ${theme.colors.SILVER};
      }
      &:focus,
      &:active {
        box-shadow: none;
        border: 1px solid ${theme.colors.SILVER};
      }
      &.disabled {
        background-color: #f8f8f8;
        border: 1px solid #e8e8e8;
      }
    }
    .ant-select-open {
      .ant-select-selection {
        border: 1px solid ${theme.colors.SILVER};
      }
    }
  }

  .ant-select-open {
    .ant-select-selection {
      &.ant-select-selection--multiple {
        border: 1px solid transparent;
        outline: none;
        &:hover,
        &:focus,
        &:active {
          border: 0;
          border-color: transparent;
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
  .ant-select-dropdown-menu {
    background-color: ${theme.colors.WHITE};
    color: ${theme.colors.GREY};
    margin: 8px;
    max-height: 235px;

    .ant-select-dropdown-menu-item {
      border-radius: 4px;
      margin-bottom: 4px;
      &:last-child{
        margin-bottom: 0px;
      }
      color: ${theme.colors.DARK_OUTER_SPACE};
      &:hover {
        background-color: ${theme.colors.INDIGO};
        color: ${theme.colors.WHITE};
        border-radius: 4px;
      }
    }
    .ant-select-dropdown-menu-item-active {
      background-color: ${theme.colors.WHITE};
      color: ${theme.colors.SHARK};
    }

  .ant-select-dropdown-menu-item-selected{
       background-color:${theme.colors.TROPICAL_BLUE};
      .icon-tick {
        content: '';
        font-size: 7px;
        font-weight: bold;
        position: absolute;
        display: block;
        right: 5px;
        top: 13px;
      }
      &:hover {
        .icon-tick {
          display: block;
        }
      }
    }
  }
  .ant-select-selection-selected-value {
    font-weight: normal;
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
  }
  .ant-select-selection--multiple {
    width: 688px;
    padding: 5px;
    border: 0px;
    &:focus {
      border-color: transparent;
      box-shadow: none;
    }
    .ant-select-selection__rendered {
      & > ul {
        & > .ant-select-selection__choice {
          border-radius: 14px;
          border: 1px solid ${theme.colors.ALTO};
          border-radius: 16px;
          background-color: ${theme.colors.PORCELAIN};
          color: ${theme.colors.OUTER_SPACE};
          font-size: 12px;
          .ant-select-selection__choice__content {
            margin-right: 5px;
          }
          &:hover {
            border: 1px solid #468ee5;
            background-color: ${theme.colors.WHITE};
            color: #468ee5;
            cursor: pointer;
            .ant-select-selection__choice__remove {
              color: #468ee5;
            }
          }
          .ant-select-selection__choice__remove {
            color: ${theme.colors.OUTER_SPACE};
            font-size: 16px;
          }
        }
      }

      & > ul > li {
        margin-bottom: 3px;
      }
    }
  }
  .ant-select-dropdown--multiple {
    z-index: 999999;
  }
`;

class Select extends Component {
  static propTypes = {
    options: PropTypes.any.isRequired,
    onChange: PropTypes.func,
    style: PropTypes.object,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    className: PropTypes.string,
    getPopupContainer: PropTypes.func,
    showTick: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ])
  };

  static defaultProps = {
    style: { minWidth: 125 },
    showTick: true
  };

  element = null;
  constructor(p) {
    super(p);
    this.element = document.createElement('div');
    this.selectRef = React.createRef();
  }

  state = {
    key: 'select'
  };

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  // hack for controlled value
  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({ key: nextProps.value });
    }
  }

  render() {
    let { options, style, showTick } = this.props;
    const container =
      this.props.getPopupContainer && this.props.getPopupContainer();
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <MtWrapper style={style} innerRef={this.selectRef} />,
          container || this.element
        )}
        <MtWrapper style={style} key={this.state.key} showTick={showTick}>
          <AntSelect
            {...this.props}
            onClick={event => {
              event.stopPropagation();
            }}
            getPopupContainer={() => {
              return this.selectRef.current;
            }}
            dropdownClassName={classnames(
              'selectDropdownStyle',
              this.props.className
            )}
          >
            {options.map(option => {
              return (
                <Option
                  key={option.key}
                  value={option.key}
                  title={this.props.title || option.title}
                >
                  {typeof option.content === 'string' ? (
                    <StringToHTML content={option.content} />
                  ) : (
                    option.content
                  )}
                  {showTick && <Icon type="tick" />}
                </Option>
              );
            })}
          </AntSelect>
        </MtWrapper>
      </React.Fragment>
    );
  }
}

class AsyncSelect extends Component {
  static propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.array
  };

  static defaultProps = {
    style: { minWidth: 125 }
  };

  handleSearch = async value => {
    this.props.handleSearch(value);
  };

  handleChange = value => {
    this.props.handleChange(value);
  };

  render() {
    const { style } = this.props;

    return (
      <MtWrapper
        innerRef={el => {
          if (el) {
            this.selectDropdownRef = el;
          }
        }}
        style={style}
      >
        <AntSelect
          {...this.props}
          showSearch
          value={this.props.value}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          filterOption={false}
          defaultActiveFirstOption={false}
          showArrow={false}
        >
          {this.props.options &&
            this.props.options.map(option => {
              return (
                <Option
                  key={option.key}
                  value={option.key}
                  title={this.props.title || option.title}
                  disabled={option.disabled}
                >
                  {typeof option.content === 'string' ? (
                    <StringToHTML content={option.content} />
                  ) : (
                    option.content
                  )}
                </Option>
              );
            })}
        </AntSelect>
      </MtWrapper>
    );
  }
}

Select.Async = AsyncSelect;

export default Select;
