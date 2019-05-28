import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import Button from '../Button';
import styled from 'styled-components';
import Icon from '../Icon';

const MtGroupDropdown = styled.div`
  .ant-dropdown {
    left: 0 !important;
  }
  .ant-dropdown-trigger {
    .ant-btn-primary {
      span {
        font-size: 8px;
        margin-top: 7px;
        display: inline-block;
        vertical-align: top;
      }
    }
    &.dropdownBtn {
      padding: 0px 10px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-left: 1px solid white;
      &:hover,
      &:focus {
        border-left: 1px solid white;
      }
    }
  }
  .ant-dropdown-menu-light {
    border: 1px solid rgba(205, 210, 217, 0.5);
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  }
  .downFillCaretIcon {
    font-size: 8px;
  }
  .labelBtn {
    display: inline-block;
    padding: 0px 10px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

class GroupButtonDropdown extends Component {
  static propTypes = {
    options: PropTypes.any.isRequired,
    trigger: PropTypes.string,
    onSelect: PropTypes.func,
    label: PropTypes.string
  };

  static defaultProps = {
    trigger: 'click',
    onSelect: () => {}
  };

  render() {
    let { label, ...rest } = this.props;
    return (
      <MtGroupDropdown>
        <Button className="labelBtn" onClick={this.props.onSelect}>
          {label}
        </Button>
        <Dropdown {...rest}>
          <Button className="dropdownBtn">
            <Icon type="down_fillcaret" className="downFillCaretIcon" />
          </Button>
        </Dropdown>
      </MtGroupDropdown>
    );
  }
}
export default GroupButtonDropdown;
