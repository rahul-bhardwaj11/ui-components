import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';

export const FileIconPreview = styled.div`
  height: inherit;
  min-height:inherit;
  border: 1px solid ${theme.colors.PEARL};
  border-radius: 8px;
  position: relative;
  .Icon {
    top: 50%;
    display: block;
    position: absolute;
    left: 50%;
    font-size: 98px;
    transform: translate(-50%, -50%);
    color: ${theme.colors.ICON};
  }
  .fileName{
      display:none;
  }
  &:hover{
    .fileName{
        display: block;
        ${mixins.darkText()} 
        border-bottom: 1px solid ${theme.colors.PEARL};
        position: absolute;
        top: 0;
        left: 0px;
        padding: 10px;
        width: 100%;
    } 
  }
`;
