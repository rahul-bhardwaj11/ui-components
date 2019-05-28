import React from 'react';
import styled from 'styled-components';
// import theme from "../styles/theme";
import mixin from '../styles/mixins';
import CheckBox from '../CheckBox';
import PropTypes from 'prop-types';

const StyledCheckBoxListOption = styled.div`
  ${mixin.clearfix()};
  ${mixin.truncate('100%')};
  .ant-checkbox-wrapper .ant-checkbox {
    margin-right: 0px;
  }
  .ant-checkbox-wrapper + span,
  .ant-checkbox + span {
    padding: 0px;
  }
  .label {
    ${mixin.truncate('100%')};
    ${props => (props.checked ? mixin.blackLink() : mixin.greyLink())};
    cursor: ${props => (props.disable ? 'no-drop' : 'pointer')};
    padding-left: 8px;
  }
  .checkBox {
    float: left;
  }
  .subLabel {
    float: right;
    ${mixin.smallGreyLink()};
    line-height: 20px;
    padding-left: 8px;
    cursor: ${props => (props.disable ? 'no-drop' : 'pointer')};
  }
`;

export function CheckBoxStyleRenderer({ data }) {
  return (
    <StyledCheckBoxListOption disable={data.disabled} checked={data.checked}>
      <CheckBox
        disabled={data.disabled}
        className="checkBox"
        checked={data.checked}
      />
      <div className="subLabel">{data.subLabel}</div>
      <div className="label">{data.label}</div>
    </StyledCheckBoxListOption>
  );
}

CheckBoxStyleRenderer.propTypes = {
  data: PropTypes.object
};
