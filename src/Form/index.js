import React from 'react';
import AntFrom from 'antd/lib/form';
import Styled from 'styled-components';
import theme from '../styles/theme';
import 'antd/lib/form/style/index.css';

const StyledForm = Styled(AntFrom)`
    
    .ant-form-item-control {
        line-height: unset;            
        .ant-form-explain {
            position: absolute;
            line-height: 18px;
            font-size: 12px; 
        }
    }
    .ant-form-item{
        margin-bottom: 0px;
    }   
    .has-error .ant-select-selection,    
    .has-error .ant-form-explain, .has-error .ant-form-split{      
      border-color: ${theme.colors.BITTERSWEET};   
      color: ${theme.colors.BITTERSWEET};   
    }
    .ant-input .ant-select-search__field{
      border-color: ${theme.colors.INDOGO};
    }        
`;
class Form extends React.Component {
  render() {
    return <StyledForm {...this.props} />;
  }
}

Form.create = AntFrom.create;
Form.Item = AntFrom.Item;
export default Form;
