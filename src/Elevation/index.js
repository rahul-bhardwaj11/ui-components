import styled from 'styled-components';
import theme from '../styles/theme';
import PropTypes from 'prop-types';

function boxShadowWithLevel(level) {
  let boxShadow;

  switch (level) {
    case 0:
      boxShadow = 'none';
      break;
    case 1:
      boxShadow = '0 2px 4px 0 rgba(0,0,0,0.08)';
      break;
    case 2:
      boxShadow = `0 4px 8px 0 rgba(0,0,0,0.08)`;
      break;
    case 3:
      boxShadow = `0 8px 16px 0 rgba(0,0,0,0.1)`;
      break;
    case 4:
      boxShadow = `0 16px 32px 0 rgba(0,0,0,0.12)`;
      break;
    default:
      boxShadow = '0 2px 4px 0 rgba(0,0,0,0.08)';
  }
  return boxShadow;
}

const Elevation = styled.div`
  border: 1px solid ${theme.colors.PEARL};
  border-radius: ${({ borderRadius = '4px' }) => borderRadius};
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: ${props => boxShadowWithLevel(props.level)};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  min-height: ${({ minHeight }) => minHeight};
  ${props => ({ ...props.style })};
`;

Elevation.propTypes = {
  width: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  level: PropTypes.number,
  minHeight: PropTypes.string,
  style: PropTypes.object
};

Elevation.defaultProps = {
  style: {}
};

export default Elevation;
