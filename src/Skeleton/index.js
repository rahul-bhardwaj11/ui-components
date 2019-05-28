import React from 'react';
import PropTypes from 'prop-types';
import StyledSkeletonLoader, { THEME } from './style';

const getWidthArray = function(indentedRows) {
  let widthArray = [];
  for (var i = 0; i < indentedRows; i++) {
    widthArray.push(Math.floor(Math.random() * 75) + 25 + '%');
  }
  return widthArray;
};

const Skeleton = props => {
  const { indentedRows = 3 } = props;

  const TITLE_WIDTH = getWidthArray(indentedRows);

  const withoutIndentProps = {
    avatar: { size: 'large', shape: 'square' },
    active: true,
    paragraph: false,
    theme: props.theme,
    title: { width: '75%' },
    ...props.withoutIndentProps
  };

  const indentProps = {
    avatar: { size: 'large', shape: 'square' },
    active: true,
    paragraph: false,
    theme: props.theme,
    ...props.indentProps
  };

  return (
    <React.Fragment>
      <StyledSkeletonLoader {...withoutIndentProps} />
      {props.indentSize && (
        <div style={{ marginLeft: props.indentSize }}>
          {TITLE_WIDTH.map((width, index) => {
            return (
              <StyledSkeletonLoader
                {...indentProps}
                title={{ width: width, ...indentProps.title }}
                key={index}
              />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

Skeleton.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEME)),
  indentSize: PropTypes.string,
  indentedRows: PropTypes.number,
  indentProps: PropTypes.object,
  withoutIndentProps: PropTypes.object
};

Skeleton.defaultProps = {
  theme: THEME.LIGHT
};

export default Skeleton;
