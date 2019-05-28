import React from 'react';
import AntAutoComplete from 'antd/lib/auto-complete';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import 'antd/lib/auto-complete/style/index.css';
import 'antd/lib/select/style/index.css';
import tickIcon from '../styles/icons/tick.svg';
import theme from '../styles/theme';

const StyledAutoComplete = Styled.div`
  .ant-select-auto-complete.ant-select .ant-select-selection .ant-input {
    &.active,
    &:focus,
    &:hover {
      border-color: ${theme.colors.SILVER};
      outline: 0;
      box-shadow: none;
    }
  }

  .ant-select-dropdown {
    ${props =>
      props.inputHeight
        ? `top: calc(${props.inputHeight} + 5px) !important`
        : ''};
  }

  .ant-select-dropdown-menu {
    margin: 8px;

    .ant-select-dropdown-menu-item {
      border-radius: 4px;
      margin-bottom: 4px;
      
      &:hover {
        background-color:${theme.colors.INDIGO};
        color:${theme.colors.WHITE};   
      }
      
      &:last-child {
        margin-bottom: 0px;
      }
    }

  .ant-select-dropdown-menu-item-selected,
  .ant-select-dropdown-menu-item-selected:hover {
    background-color:${theme.colors.TROPICAL_BLUE};
    font-weight: 600;
    color: ${theme.colors.DARK_OUTER_SPACE}; 
  }

  .ant-select-dropdown-menu-item-active,
  .ant-select-dropdown-menu-item-active:hover {
    background-color:${theme.colors.INDIGO};
    color:${theme.colors.WHITE};   
  }

  .ant-select-dropdown-menu-item-active.ant-select-dropdown-menu-item-selected {
    &::after {
      display: none
    }
  }

    .ant-select-dropdown-menu-item-selected {
      &::after {
        background: url('${tickIcon}') no-repeat 0px 0px;
        content: "";
        background-size: 9px;
        width: 10px;
        height: 7px;
        position: absolute;
        top: 13px;
        right: 6px;
      }
    }
  }
`;

class AutoComplete extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    getPopupContainer: PropTypes.func,
    children: PropTypes.node
  };

  state = {};

  handleInputKeyDown = e => {
    if (!this.props.children) return;
    e.persist();
    setTimeout(() => {
      this.setState({ targetInput: e.target });
    }, 0);
  };
  getElementHeight = element => {
    let elementHeight = element && element.style && element.style.height;
    if (this.popUpContainer) {
      elementHeight =
        parseInt(elementHeight) + this.popUpContainer.offsetTop + 'px';
    }
    return elementHeight;
  };
  render() {
    const { targetInput } = this.state;
    const inputHeight = this.getElementHeight(targetInput);

    const {
      className,
      getPopupContainer = () => {
        return this.popUpContainer;
      },
      ...rest
    } = this.props;

    return (
      <StyledAutoComplete
        inputHeight={inputHeight}
        innerRef={ele => {
          if (ele) this.popUpContainer = ele;
        }}
        className={className}
      >
        <AntAutoComplete
          {...rest}
          getPopupContainer={getPopupContainer}
          onInputKeyDown={this.handleInputKeyDown}
          defaultActiveFirstOption={false}
        />
      </StyledAutoComplete>
    );
  }
}

AutoComplete.Option = AntAutoComplete.Option;
export default AutoComplete;
