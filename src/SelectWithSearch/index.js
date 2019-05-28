import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme';
import AsyncSelect from './asyncSelect';
import SyncSelect from './syncSelect';
import mixin from '../styles/mixins';
import searchIcon from '../styles/icons/search.svg';
import arrowIcon from '../styles/icons/downFillcaret.svg';
import classnames from 'classnames';

const SelectBox = styled.div`
  position: relative;
  .mt-react-select__control {
    min-height: auto;
    background: ${theme.colors.WHITE};
    line-height: 18px;
  }

  .mt-react-select__placeholder {
    color: ${theme.colors.SILVER};
  }

  &.buttonSelect {
    .mt-react-select__control {
       width: 100%;
       height: 32px;
       border-bottom-left-radius: 0px;
       border-bottom-right-radius: 0px;
       border-bottom: 1px solid transparent;
     }

    .selectedItems{
      color: ${theme.colors.INDIGO};
      border: 1px solid ${theme.colors.INDIGO};
      background-color: ${theme.colors.TROPICAL_BLUE};

      &:hover{
        border: 1px solid ${theme.colors.INDIGO};
        color: ${theme.colors.INDIGO};
      }
    }
    .activeSelect{
        color: ${theme.colors.INDIGO};
        border: 1px solid ${theme.colors.INDIGO};
        &:hover{
          border: 1px solid ${theme.colors.INDIGO};
          color: ${theme.colors.INDIGO};
        }
    }
    .selectWithSearchText{
      display: inline-block;
      line-height: 16px;
      .discIcon{
        font-size: 4px;
        margin: -2px 8px 0px;
        vertical-align: middle;
        display: inline-block;
      }
    }
  }

  .mt-react-select__single-value {
    color: ${theme.colors.DARK_OUTER_SPACE};
    left: 0px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .mt-react-select__single-value + div, .mt-react-select__placeholder + div {
    margin: 0px 2px;
    line-height: 22px;
  }

  .mt-react-select__value-container--is-multi {
    line-height: 26px;
  }

  .mt-react-select__value-container{
    margin-left: 10px;
    overflow: hidden;
    padding-left: 0px;
    margin-right: 32px;
    cursor: text;
    &:before {
      content: '';
      display: none;
    }
  }
  .mt-react-select__menu {
    z-index: 11;
    margin: 0px;
    ${props =>
      props.showSearch
        ? `border-top-left-radius: 0px;
    border-top-right-radius: 0px;`
        : `margin-top: 8px;`}
    border: 1px solid ${theme.colors.PEARL};
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.08);
  }

  .mt-react-select__menu-list {
    padding: 8px 0;
    color: ${theme.colors.OUTER_SPACE};
  }

  .selectBoxWrapper{
    border-radius: 4px;
    position: relative;
    z-index: 2;
    ${props => (props.isButton ? 'margin-top: 10px' : '')};

    .activeSearch {
      .mt-react-select__value-container{
        margin-left: 34px;
        line-height: 18px;
      }

      .activeInput {
        .icon-cross {
          display: block;
          position: absolute;
          right: 14px;
          top: 12px;
          font-size: 10px;
          cursor: pointer;
          &:before {
            float: right;
          }
        }
    }
    .mt-react-select__control {
      height: 32px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom: 1px solid transparent;
      &:before {
        display: block;
        background: url('${searchIcon}') no-repeat 1px 0px;
        height: 18px;
        width: 19px;
        content: '';
        background-size: 13px;
        left: 0;
        position: absolute;
        opacity: 0.6;
        left: 16px;
        top: 9px;
        line-height: 18px;
      }
    }
    .mt-react-select__dropdown-indicator {
      display: none;
    }
      .mt-react-select__single-value {
        margin-left: 20px;
        line-height: 26px;
      }
    }

   .mt-react-select__placeholder {
      margin-left: 4px;
      ${mixin.placeholderText()};
      ${mixin.truncate('100%')};
    }

    .mt-react-select__dropdown-indicator {
      display: block;
      background: url('${arrowIcon}') no-repeat 0px 7px;
      background-size: 8px;

      svg {
        display: none;
      }
    }
 }

  .mt-react-select__clear-indicator{
    display: none;
  }

  .mt-react-select__control {
    border: 1px solid ${theme.colors.PEARL};
    position: relative;
    &:hover{
      border: 1px solid ${theme.colors.PEARL};
    }
  }

  .mt-react-select__control--is-focused {
    border: 1px solid ${theme.colors.PEARL};

    box-shadow: none;
  }

  .mt-react-select__control--is-focused:hover {
    border: 1px solid ${theme.colors.PEARL};
  }

  .mt-react-select__option {
    border-radius: 4px;
    padding: 6px 20px 8px 16px;
    color: ${theme.colors.OUTER_SPACE};
    height: 32px;
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 8px;
  }

  .mt-react-select__option--is-selected {
    background-color:  ${theme.colors.WHITE};
    color: ${theme.colors.OUTER_SPACE};
  }

  .mt-react-select__option--is-focused {
    background-color:  ${theme.colors.WHITE};
    color: ${theme.colors.OUTER_SPACE};
    cursor: pointer;

    &:hover {
      background-color:  ${theme.colors.INDIGO};
      color: ${theme.colors.WHITE};
    }
  }

  .mt-react-select__option--is-disabled  {
      color: ${theme.colors.SILVER};

    &:hover  {
      background-color:  ${theme.colors.PORCELAIN};
    }
  }

  .mt-react-select__indicator-separator {
    display: none;
  }

  .ant-checkbox-wrapper .ant-checkbox {
    vertical-align: middle;
    margin-right: 8px;
  }

  .selectedItem {
    margin-left: 2px;
    margin-right: 2px;
    font-size: 14px;
    color: ${theme.colors.DARK_OUTER_SPACE};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;

    .selectedItemLabel{
      max-width: calc(100% - 23px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

.componentWrapper {
  ${mixin.clearfix()};
  width: 100%;
  padding: 10px 0px;
  button{
    box-shadow: none;
  }
}

.buttonWrapperL {
  float: left;
  width: 50%;

}

.buttonWrapperR {
  width: 50%;
  text-align: right;
  float: right;
  .activeBtnState {
   color: ${theme.colors.INDIGO};
  }
}

.buttonWrapperL, .buttonWrapperR {
  .ant-btn {
    padding: 0 16px;
  }
};

.icon-cross {
  display: none;
}

.mt-react-select__value-container:before {
  height: 22px;
  width: 26px;
}

.checkboxWrapper {
  float: none;
  padding: 6px 8px;
  margin: 0 8px;
  line-height: initial;
  ${mixin.truncate('100%')};
  .ant-checkbox-wrapper .ant-checkbox {
    margin-right: 0px;
  }
  .labelText{
    ${mixin.truncate('100%')};
    display: block;
  }

  &:hover {
    .ant-checkbox-wrapper .checkBoxLabel {
      color: ${theme.colors.SHARK};
    }
  }
}
.doneMarginR {
  margin-left: 5px;
}
`;

const PortalSelectBox = styled(SelectBox)`
  position: unset;
`;
class SelectWithSearch extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    async: PropTypes.bool,
    placeholder: PropTypes.string,
    isMulti: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isButton: PropTypes.bool,
    fixedButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    buttonMaxWidth: PropTypes.string,
    buttonWidth: PropTypes.string,
    className: PropTypes.string,
    showSearch: PropTypes.bool,
    menuPortalTarget: PropTypes.instanceOf(Element)
  };
  static defaultProps = {
    placeholder: 'Type here to Search',
    onChange: () => {},
    showSearch: true
  };

  state = {
    menuRef: null
  };

  setMenuRef = menuRef => {
    const { menuRef: oldMenuRef } = this.state;
    if (oldMenuRef || !menuRef) {
      return;
    }
    this.setState({
      menuRef
    });
  };

  render() {
    let {
      async,
      isButton,
      className,
      showSearch,
      menuPortalTarget,
      ...props
    } = this.props;
    const selectProps = {
      async,
      isButton,
      showSearch,
      ...props
    };
    const { menuRef } = this.state;
    let SelectComponent = SyncSelect;
    if (async) {
      SelectComponent = AsyncSelect;
    }
    let componentClassName = classnames(
      {
        buttonSelect: isButton
      },
      className
    );
    if (menuPortalTarget) {
      selectProps.menuPortalTarget = menuRef;
      selectProps.menuPosition = 'absolute';
    }

    return (
      <React.Fragment>
        {menuPortalTarget &&
          ReactDOM.createPortal(
            <PortalSelectBox
              innerRef={this.setMenuRef}
              className={componentClassName}
              isButton={isButton}
              showSearch={showSearch}
            />,
            menuPortalTarget
          )}
        <SelectBox
          className={componentClassName}
          isButton={isButton}
          showSearch={showSearch}
        >
          <SelectComponent {...selectProps} />
        </SelectBox>
      </React.Fragment>
    );
  }
}

export default SelectWithSearch;
