import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';

const MTPDFPlayer = styled.div`
  .uploaderHeader {
    ${mixins.clearfix()};
    height: 48px;
    line-height: 48px;
    padding: 8px 10px 8px 9px;
    border: 1px solid ${theme.colors.ALTO};
    border-bottom: none;
    border-radius: 3px 3px 0 0;
  }
  .inputTitle {
    width: 260px;
    line-height: 30px;
    padding: 0 11px;
    :focus {
      box-shadow: none;
    }
  }
  .editMode {
    float: left;
    ${mixins.clearfix()};
    line-height: 32px;
  }
  .replaceModeIcon {
    float: right;
    line-height: 32px;
    display: block;
    cursor: pointer;
  }
  .titleText {
    color: ${theme.colors.DARK_OUTER_SPACE};
    font-size: 14px;
    cursor: pointer;
    line-height: 32px;
    height: 32px;
    ${mixins.truncate('260px')};
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0 11px;
    width: 260px;
    &:hover {
      border: 1px solid ${theme.colors.ALTO};
    }
  }
  .inputBox,
  .tagBox {
    float: left;
  }
  .saveTag {
    margin-left: 24px;
  }
`;
export default MTPDFPlayer;
