import AntButton from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';

export const BUTTON_SIZES = {
  LARGE: 'large',
  SMALL: 'small',
  MEDIUM: 'medium'
};

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  LINK: 'link',
  TEXT: 'text',
  EDIT: 'edit'
};

export const BUTTON_LOADER_COLOR = {
  [BUTTON_TYPES.PRIMARY]: theme.colors.WHITE,
  [BUTTON_TYPES.SECONDARY]: theme.colors.DARK_OUTER_SPACE,
  [BUTTON_TYPES.TERTIARY]: theme.colors.OUTER_SPACE,
  [BUTTON_TYPES.LINK]: theme.colors.INDIGO,
  [BUTTON_TYPES.TEXT]: theme.colors.OUTER_SPACE,
  [BUTTON_TYPES.EDIT]: theme.colors.OUTER_SPACE
};

export const MT_SIZE_TO_ANT_BUTTON_SIZE_MAP = {
  [BUTTON_SIZES.LARGE]: BUTTON_SIZES.LARGE,
  [BUTTON_SIZES.MEDIUM]: 'default',
  [BUTTON_SIZES.SMALL]: BUTTON_SIZES.SMALL
};

export const MT_TYPE_ANT_BUTTON_TYPE_MAP = {
  [BUTTON_TYPES.PRIMARY]: 'primary',
  [BUTTON_TYPES.SECONDARY]: 'default',
  [BUTTON_TYPES.TERTIARY]: 'dashed',
  [BUTTON_TYPES.LINK]: 'link',
  [BUTTON_TYPES.TEXT]: 'text',
  [BUTTON_TYPES.EDIT]: 'edit'
};

const BUTTON_TO_SIZE_MAP = {
  [MT_TYPE_ANT_BUTTON_TYPE_MAP[BUTTON_TYPES.PRIMARY]]: {
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.LARGE]]: BUTTON_SIZES.LARGE,
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.MEDIUM]]: 'default',
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.SMALL]]: BUTTON_SIZES.SMALL
  },
  [MT_TYPE_ANT_BUTTON_TYPE_MAP[BUTTON_TYPES.SECONDARY]]: {
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.LARGE]]: BUTTON_SIZES.LARGE,
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.MEDIUM]]: 'default',
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.SMALL]]: BUTTON_SIZES.SMALL
  },
  [MT_TYPE_ANT_BUTTON_TYPE_MAP[BUTTON_TYPES.TERTIARY]]: {
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.LARGE]]: BUTTON_SIZES.LARGE,
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.MEDIUM]]: 'medium',
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.SMALL]]: BUTTON_SIZES.SMALL
  },
  [MT_TYPE_ANT_BUTTON_TYPE_MAP[BUTTON_TYPES.LINK]]: {
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.LARGE]]: BUTTON_SIZES.LARGE,
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.MEDIUM]]: 'medium',
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.SMALL]]: BUTTON_SIZES.SMALL
  },
  [MT_TYPE_ANT_BUTTON_TYPE_MAP[BUTTON_TYPES.TEXT]]: {
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.LARGE]]: BUTTON_SIZES.LARGE,
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.MEDIUM]]: 'medium',
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.SMALL]]: BUTTON_SIZES.SMALL
  },
  [MT_TYPE_ANT_BUTTON_TYPE_MAP[BUTTON_TYPES.EDIT]]: {
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.LARGE]]: BUTTON_SIZES.LARGE,
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.MEDIUM]]: 'medium',
    [MT_SIZE_TO_ANT_BUTTON_SIZE_MAP[BUTTON_SIZES.SMALL]]: BUTTON_SIZES.SMALL
  }
};

export const ANTD_BUTTON_SIZE_PADDING = {
  [BUTTON_SIZES.LARGE]: '0px 24px',
  default: '0px 12px',
  medium: '0px 16px',
  [BUTTON_SIZES.SMALL]: '0px 12px'
};

const MtButton = styled(AntButton)`
  &.ant-btn {
    font-family: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 4px;
    ${mixins.button()};
    padding: ${props =>
      ANTD_BUTTON_SIZE_PADDING[BUTTON_TO_SIZE_MAP[props.type][props.size]]};

    /*---------- Default Button styles ------------*/
    &.ant-btn-default {
      border: 1px solid ${theme.colors.ALTO};
      color: ${theme.colors.DARK_OUTER_SPACE};

      &.ant-btn-sm {
        font-size: 12px;
      }
      &:hover {
        color: ${theme.colors.DARK_OUTER_SPACE};
        border: 1px solid ${theme.colors.SILVER};
      }
      &:active,
      &:focus,
      &.active {
        border: 1px solid ${theme.colors.INDIGO};
        color: ${theme.colors.INDIGO};
      }
      &.disabled,
      &:disabled,
      &[disabled]:hover {
        border: 1px solid ${theme.colors.DISABLE};
        background-color: ${theme.colors.PORCELAIN};
        color: ${theme.colors.SILVER};
      }
    }

    /*---------- Primary Button styles ------------*/
    &.ant-btn-primary {
      border: 1px solid ${theme.colors.INDIGO};
      background-color: ${theme.colors.INDIGO};
      color: #fff;
      &.ant-btn-sm {
        font-size: 12px;
      }
      &:hover,
      &:focus,
      &:active,
      &.active {
        border: 1px solid ${theme.colors.NEPTUNE};
        background: ${theme.colors.NEPTUNE};
        color: #fff;
      }
      &.disabled,
      &:disabled,
      &[disabled]:hover {
        border: 1px solid ${theme.colors.ALTO};
        background: ${theme.colors.ALTO};
        color: ${theme.colors.WHITE};
      }
    }

    /*---------- Edit Button styles ------------*/
    &.ant-btn-edit {
      border: 1px solid ${theme.colors.ALTO};
      color: ${theme.colors.SILVER};
      &.ant-btn-sm {
        color: ${theme.colors.SILVER};
        font-size: 12px;
      }
      &:hover,
      &:focus,
      &:active,
      &.active {
        border: 1px solid ${theme.colors.ALTO};
        color: ${theme.colors.SILVER};
        span {
          color: ${theme.colors.SILVER};
        }
      }
      &.disabled,
      &:disabled,
      &[disabled]:hover {
        background-color: ${theme.colors.PORCELAIN};
        color: ${theme.colors.SILVER};
        border: 1px solid ${theme.colors.DISABLE};
      }
    }

    /*---------- Dashed Button styles ------------*/
    &.ant-btn-dashed {
      border: 1px dashed ${theme.colors.ALTO};
      background-color: ${theme.colors.WHITE};
      color: ${theme.colors.OUTER_SPACE};

      &.ant-btn-sm {
        font-size: 12px;
      }
      &:hover,
      &:focus,
      &:active,
      &.active {
        color: ${theme.colors.SHARK};
      }
      &.disabled,
      &:disabled,
      &[disabled]:hover {
        border: 1px dashed ${theme.colors.ALTO};
        background-color: ${theme.colors.WHITE};
        color: ${theme.colors.SILVER};
      }
    }
    /*---------- Text Button styles ------------*/
    &.ant-btn-text {
      border: 1px dashed transparent;
      background-color: transparent;
      color: ${props =>
        props.danger
          ? `${theme.colors.BITTERSWEET}`
          : `${theme.colors.OUTER_SPACE}`};

      ${props =>
        props.active
          ? `color: ${theme.colors.INDIGO};
          background-color: ${theme.colors.TROPICAL_BLUE}`
          : null};
      ${props =>
        props.disabled ? `color: ${theme.colors.OUTER_SPACE}` : null};

      &:hover,
      &:focus,
      &:active {
        border: 1px dashed transparent;
        ${props =>
          props.active
            ? `color: ${theme.colors.INDIGO};
            background-color: ${theme.colors.TROPICAL_BLUE}`
            : `background-color: transparent;
              color: ${theme.colors.INDIGO}`};
        ${props =>
          props.danger ? `color: ${theme.colors.BITTERSWEET}` : null};
      }
      &.ant-btn-sm {
        font-size: 12px;
      }
      &.disabled,
      &:disabled,
      &[disabled]:hover {
        border: 1px solid transparent;
        background-color: ${theme.colors.WHITE};
        color: ${theme.colors.SILVER};
      }
    }
    /*---------- Link Blue Button styles ------------*/
    &.ant-btn-link {
      border: 1px solid ${theme.colors.INDIGO};
      background-color: #fff;
      color: ${theme.colors.INDIGO};

      &.ant-btn-sm {
        font-size: 12px;
      }
      &.disabled,
      &:disabled {
        background-color: ${theme.colors.WHITE};
        color: ${theme.colors.SILVER};
        border: 1px solid ${theme.colors.DISABLE};
      }
    }

    &.disabled,
    &:disabled {
      border: 1px solid ${theme.colors.DISABLE};
      color: ${theme.colors.WHITE};
      background: ${theme.colors.ALTO};
    }
  }

  &.ant-btn-clicked {
    outline: none;
    outline-style: none;
  }
  .editIcon {
    padding: 3px;
  }

  /* loading Button styles */

  &.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline):not(.ant-btn-icon-only) {
    &.ant-btn-sm,
    &.ant-btn.lg,
    &.ant-btn {
      padding: ${props =>
        ANTD_BUTTON_SIZE_PADDING[BUTTON_TO_SIZE_MAP[props.type][props.size]]};

      &:before {
        background: transparent;
      }
    }
    .anticon {
      display: none;
    }
  }

  &.ant-btn {
    & > span {
      visibility: ${props => (props.loading ? 'hidden' : 'visible')};
    }
    & > .anticon {
      & + span {
        display: none;
      }
    }
  }
`;

export default MtButton;
