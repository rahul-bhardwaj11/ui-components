import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntInput from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import styled from 'styled-components';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import classnames from 'classnames';

const noop = () => undefined;

const isString = value => {
  return typeof value === 'string';
};

const MtInput = styled.div`
  position: relative;
  .counterStyle {
    ${mixins.smallGreyLink()};
    line-height: 20px;
    position: absolute;
    right: 0px;
  }
  .displayN {
    display: none;
  }
  .error {
    font-size: 12px;
    bottom: -20px;
    left: 2px;
    position: absolute;
    color: ${theme.colors.BITTERSWEET};
  }
  .ant-input.errorInputStyle {
    border: 1px solid red;
    &:focus,
    &:hover {
      border: 1px solid #f5222d;
    }
  }

  .ant-input {
    border: 1px solid ${theme.colors.ALTO};
    font-family: inherit;
  }
  .ant-input {
    &:hover {
      border-color: ${theme.colors.SILVER};
    }
  }
  .ant-input {
    &.active,
    &:focus {
      border-color: ${theme.colors.SILVER};
      outline: 0;
      box-shadow: none;
    }
  }
  .ant-input-disabled {
    border-color: ${theme.colors.DISABLE};
    background-color: #f8f8f8;
    color: ${theme.colors.SILVER};
    &:hover {
      border-color: ${theme.colors.DISABLE};
    }
  }
  .ant-input-error {
    border-color: #ff6060;
  }
`;

class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    maxLengthClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    showMaxLength: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['text', 'number', 'password', 'file']),
    errors: PropTypes.array
  };

  static defaultProps = {
    onChange: noop,
    onFocus: noop,
    errors: [],
    type: 'text'
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.handleValue(this.props.value)
    };
  }

  handleValue = value => {
    let trimmedValue = isString(value) ? value.trim() : value;
    trimmedValue = trimmedValue || '';
    value = trimmedValue.length ? value : trimmedValue;
    const { maxLength } = this.props;
    if (maxLength) {
      return maxLength <= value.length ? value : value.substring(0, maxLength);
    }
    return value;
  };

  onChange = event => {
    const { onChange } = this.props;
    const value = this.handleValue(event.target.value);
    this.setState({ value });
    onChange(event, value);
  };

  moveCaretAtEnd = e => {
    var temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
    this.props.onFocus(e);
  };

  componentWillMount() {
    let { value, defaultValue } = this.props;
    if (!value) {
      value = defaultValue ? defaultValue : '';
    }

    this.setState({ value: this.handleValue(value) });
  }

  componentWillReceiveProps(newProps) {
    const { value } = this.props;
    let { value: newValue } = newProps;
    if (newValue !== value) {
      this.setState({ value: this.handleValue(newValue) });
    }
  }

  render() {
    const {
      errors,
      maxLength,
      maxLengthClassName,
      showMaxLength,
      wrapperClassName,
      className,
      ...rest
    } = this.props;
    const { value } = this.state;
    return (
      <MtInput className={wrapperClassName}>
        <AntInput
          {...rest}
          value={value}
          maxLength={maxLength}
          onChange={this.onChange}
          onFocus={this.moveCaretAtEnd}
          className={classnames(className, { errorInputStyle: errors[0] })}
        />
        {maxLength &&
          showMaxLength && (
            <div
              key="maxLength"
              className={classnames(
                { ['counterStyle']: maxLength, displayN: !maxLength },
                maxLengthClassName
              )}
            >
              {maxLength && maxLength - value.length}
            </div>
          )}
        <div
          key="error"
          className={classnames(errors[0] ? 'error' : 'displayN')}
        >
          {errors[0]}
        </div>
      </MtInput>
    );
  }
}

export default Input;
