import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
const StyledToast = styled.div`
  .toast {
    border-radius: 4px;
    text-align: center;
    padding: 7px 24px 8px 24px;
    max-width: 600px;
    margin-right: 8px;
    &.toast-info {
      background-color: #5dc778;
    }
    &.toast-success {
      background-color: #5dc778;
    }
    &.toast-warning {
      background-color: ${theme.colors.BITTERSWEET};
    }
    &.toast-error {
      background-color: ${theme.colors.BITTERSWEET};
      float: left;
    }
    &.toast-loading {
      background-color: ${theme.colors.SHARK};
    }
    .toastMessage {
      ${mixins.whiteText()};
    }
  }
  .toastReloadBtn {
    ${mixins.darkText()};
    padding: 6px 24px 7px 24px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid ${theme.colors.WHITE};
    background-color: ${theme.colors.WHITE};
  }
  .styleToastBtn {
    float: right;
  }
`;

export default StyledToast;
