import styled from 'styled-components';
import mixins from '../styles/mixins';
import Modal from '../Modal';

const StyleAlertBox = styled(Modal)`
  .ant-modal .ant-modal-body {
    min-height: 150px;
  }
  .getHelpMsg {
    margin-top: 65px;
    ${mixins.h3()};
    text-align: center;
  }
`;

export default StyleAlertBox;
