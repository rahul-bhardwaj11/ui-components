import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; // If using WebPack and style-loader.
import styled from 'styled-components';
import searchIcon from '../styles/icons/search.svg';
import theme from '../styles/theme';
import mixins from '../styles/mixins';

const StyleAutoCompleteTag = styled.div`
  .react-tagsinput {
    position: relative;
    font-family:inherit;
    min-height: 32px;
    max-height: 144px;
    background-color:${theme.colors.WHITE};
    overflow: auto;
    border-radius: 4px;
    border: 1px solid  ${theme.colors.ALTO};
    padding: 0 ${props => (props.withSearch ? `32px` : `12px`)};
    &:before {
        display: ${props => (props.withSearch ? `block` : `none`)};
        background: url('${searchIcon}') no-repeat 1px 0px;
        height: 15px;
        width: 15px;
        content: '';
        background-size: 13px;
        position: absolute;
        opacity: 0.6;
        left: 12px;
        top: 9px;
      }
      &:hover{
        border: 1px solid  ${theme.colors.SILVER};
      }
  }
  .react-tagsinput-input {
    background: transparent;
    border: 0;
    color: ${theme.colors.SHARK};
    font-size: 12px;
    font-weight: 500;
    outline: none;
    width: auto;
    padding: 0;
    margin:0 0 0  ${props => (props.withSearch ? `4px` : `0`)};;
    line-height: 30px;
    float:left;
    font-family:inherit;
    ::placeholder{
      color: ${theme.colors.ALTO};
    }
  }
  .react-tagsinput-tag {
    font-family:inherit;
    height: 24px;
    border: 1px solid  ${theme.colors.ALTO};
    border-radius: 16px;
    background-color: ${theme.colors.PORCELAIN};
    padding: 3px 12px;
    ${mixins.smallGreyLink()};
    margin: 4px 8px 4px 0;
    float:left;
    cursor: pointer;
    position: relative;
  }

  .tag-value {
    ${mixins.truncate()};
    max-width: 250px;
    float: left;
  }

  .react-tagsinput-remove {
    cursor: pointer;
    color:${theme.colors.SILVER};
    font-size:14px;
    position: absolute;
    right: 4px;
  }
`;

const RenderTag = props => {
  let {
    tag,
    key,
    disabled,
    onRemove,
    classNameRemove,
    getTagDisplayValue,
    ...other
  } = props;
  const tagValue = getTagDisplayValue(tag);
  return (
    <span key={key} {...other}>
      <span className="tag-value" title={tagValue}>
        {tagValue}
      </span>
      {!disabled && (
        <a className={classNameRemove} onClick={() => onRemove(key)} />
      )}
    </span>
  );
};

RenderTag.propTypes = {
  key: PropTypes.number,
  tag: PropTypes.string,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
  classNameRemove: PropTypes.string,
  getTagDisplayValue: PropTypes.func
};

class AutoCompleteTag extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    tags: PropTypes.array,
    className: PropTypes.string,
    withSearch: PropTypes.bool,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    withSearch: true,
    inputProps: {
      placeholder: 'Search words',
      maxLength: 50
    }
  };

  render() {
    const {
      className,
      withSearch,
      inputProps,
      tags = [],
      onChange,
      ...rest
    } = this.props;
    return (
      <StyleAutoCompleteTag className={className} withSearch={withSearch}>
        <TagsInput
          inputProps={inputProps}
          {...rest}
          renderTag={RenderTag}
          value={tags}
          onChange={onChange}
          onlyUnique={true}
        />
      </StyleAutoCompleteTag>
    );
  }
}

export default AutoCompleteTag;
