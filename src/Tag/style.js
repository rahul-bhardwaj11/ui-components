import styled, { css } from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import AntTag from 'antd/lib/tag';
import 'antd/lib/tag/style/index.css';

export const TYPES = {
  NORMAL: 'normal',
  ADD: 'add',
  ADDED: 'added',
  SELECTED: 'selected',
  SELECTION: 'selection',
  ACTION: 'action'
};

const AppliedStyle = css`
  &.ant-tag,
  &.ant-tag:hover {
    color: ${theme.colors.INDIGO};
    border: 1px solid ${theme.colors.INDIGO};
    background-color: ${theme.colors.TROPICAL_BLUE};
  }
`;

const DisabledStyle = css`
  &.ant-tag {
    border: 1px solid ${theme.colors.PEARL};
    color: ${theme.colors.SILVER};
    background-color: ${theme.colors.WHITE};
    cursor: not-allowed;
    outline: none;
    &:hover {
      border: 1px solid ${theme.colors.PEARL};
      color: ${theme.colors.SILVER};
      background-color: ${theme.colors.WHITE};
      outline: none;
    }
  }
`;

const DefaultTag = css`
  &.ant-tag {
    &:hover {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.OUTER_SPACE};
      opacity: 1;
    }
    &:active {
      border: 1px solid ${theme.colors.INDIGO};
      color: ${theme.colors.INDIGO};
    }
  }
`;

const ActionTag = css`
  &.ant-tag {
    color: ${theme.colors.INDIGO};
    border: 1px solid ${theme.colors.INDIGO};
    &:hover {
      border: 1px solid ${theme.colors.JODHPUR};
      color: ${theme.colors.JODHPUR};
      opacity: 1;
    }
    &:active  {
      border: 1px solid ${theme.colors.NEPTUNE};
      color: ${theme.colors.NEPTUNE};
    }
  }
  /* &:focus {
    .ant-tag {
      border: 1px solid ${theme.colors.INDIGO};
      color: ${theme.colors.INDIGO};
      background-color: ${theme.colors.TROPICAL_BLUE};
    }
  } */
`;

const AddTag = css`
  &.ant-tag {
    &:hover {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.OUTER_SPACE};
      opacity: 1;
    }
    &:active {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.DARK_OUTER_SPACE};
    }
  }
`;

const AddedTag = css`
  &.ant-tag {
    background-color: ${theme.colors.PORCELAIN};
    &:hover {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.OUTER_SPACE};
      background-color: ${theme.colors.PORCELAIN};
      opacity: 1;
    }
    &:active {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.DARK_OUTER_SPACE};
      background-color: ${theme.colors.PORCELAIN};
    }
  }
`;

const SelectionTag = css`
  &.ant-tag {
    background-color: ${theme.colors.PORCELAIN};
    &:hover {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.OUTER_SPACE};
      background-color: ${theme.colors.PORCELAIN};
      opacity: 1;
    }
    &:active {
      border: 1px solid ${theme.colors.SILVER};
      color: ${theme.colors.DARK_OUTER_SPACE};
      background-color: ${theme.colors.PORCELAIN};
    }
  }
`;

const CheckableTag = css`
  /* &:focus {
    .ant-tag.ant-tag-checkable {
      border: 1px solid ${theme.colors.ALTO};
      color: ${theme.colors.OUTER_SPACE};
      background-color: ${theme.colors.WHITE};
    }
  } */

  &.ant-tag {
    &.ant-tag-checkable:not(.ant-tag-checkable-checked) {
      border: 1px solid ${theme.colors.ALTO};
      &:hover {
        color: ${theme.colors.OUTER_SPACE};
      }
    }
    &.ant-tag-checkable {
      &:active{
        background-color: ${theme.colors.TROPICAL_BLUE};
      }
      &.ant-tag-checkable-checked {
        border: 1px solid ${theme.colors.TAG_HOVER_TEXT_COLOR};
        background-color: ${theme.colors.TROPICAL_BLUE};
        color: ${theme.colors.TAG_HOVER_TEXT_COLOR};
        &:hover {
          border: 1px solid ${theme.colors.TAG_HOVER_TEXT_COLOR};
          background-color: ${theme.colors.TROPICAL_BLUE};
          color: ${theme.colors.TAG_HOVER_TEXT_COLOR};
        }
      }
    }
  }
  ${props => (props.disabled ? DisabledStyle : '')};
`;

const TagStyle = css`
  &.ant-tag {
    background-color: ${props =>
      props.closable ? theme.colors.PORCELAIN : theme.colors.WHITE};
    font-family: inherit;
    border: 1px solid ${theme.colors.ALTO};
    ${mixins.smallGreyLink()};
    font-weight: 600;
    border-radius: 16px;
    line-height: 22px;
    height: 24px;
    padding: 0px 15px;
    &:active {
      outline: none;
    }
    .anticon-cross {
      color: ${theme.colors.OUTER_SPACE};
    }
    .tagIcon {
      font-size: 10px;
      margin-left: 8px;
    }
  }
`;

const TagWrapper = styled(AntTag)`
  display: inline-block;
  ${TagStyle};
`;

const MtTag = styled(TagWrapper)`
  ${props => {
    switch (props.type) {
      case TYPES.NORMAL:
        return DefaultTag;
      case TYPES.ADD:
        return AddTag;
      case TYPES.ADDED:
        return AddedTag;
      case TYPES.SELECTED:
        return CheckableTag;
      case TYPES.SELECTION:
        return SelectionTag;
      case TYPES.ACTION:
        return ActionTag;
    }
  }};
  ${props => (props.applied ? AppliedStyle : '')};
  ${props => (props.disabled ? DisabledStyle : '')};
`;

export const MtCheckableTag = styled(AntTag.CheckableTag)`
  display: inline-block;
  ${TagStyle};
  ${CheckableTag};
`;

export default MtTag;
