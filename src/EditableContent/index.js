import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Tag from '../Tag';
import Icon from '../Icon';
import theme from '../styles/theme';
import styled from 'styled-components';

const StyledEditableContent = styled.div`
  padding: 6px 12px;

  .editableText {
    float: left;
    cursor: pointer;
    padding-right: 26px;
  }

  .icon-edit {
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 0px;
  }

  .editableWrapper {
    float: left;
    position: relative;
    max-width: 100%;
  }
`;

const StyledEditableInput = styled.div`
  .editableInputControl {
    width: 40%;
    float: left;
    position: relative;

    .icon-close {
      font-size: 10px;
    }
  }

  .editableContentSaveBtn,
  .editableContentCancelBtn {
    margin: 4px 0px 0px 12px;
    padding: 0px 12px;
  }

  .ant-input-group-addon {
    width: 32px;
    font-size: 11px;
    padding: 0 6px;
    background-color: ${theme.colors.WHITE};
  }
`;

class EditableContent extends Component {
  getInitialState = () => ({
    editing: false,
    nextValue: this.props.value
  });

  state = this.getInitialState();

  static propTypes = {
    editOnEnter: PropTypes.bool,
    showRemainingCharacterCount: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    placeholder: 'Add Content',
    editOnEnter: false,
    value: '',
    showRemainingCharacterCount: false
  };

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.value !== newProps.value) {
      this.setState(this.getInitialState()); // reset to older state
    }
  }

  toggleEditMode = editing =>
    this.setState(prevState => ({
      editing: typeof editing === 'undefined' ? !prevState.editing : editing
    }));

  handleSave = () => {
    if (this.state.nextValue) {
      // do not save empty value in edit mode
      this.props.onSave(this.state.nextValue.trim());
      this.toggleEditMode();
    } else {
      // set the initial state when we click on close with empty value
      this.setState(this.getInitialState());
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({ nextValue: this.props.value }); // resetting to older value
    this.toggleEditMode();
    onCancel && onCancel();
  };

  handleInputChange = event => {
    const { onChange } = this.props;
    const content = event.target.value;
    this.setState({ nextValue: content });
    onChange && onChange(content);
  };

  handleClear = () => this.setState({ nextValue: '' });

  renderEditingComponent() {
    const {
      editOnEnter,
      showRemainingCharacterCount,
      ...inputProps
    } = this.props;
    if (editOnEnter) {
      inputProps.onPressEnter = this.handleSave;
      inputProps.onBlur = this.handleSave;
      inputProps.suffix = <Icon type="close" onClick={this.handleClear} />;
    }
    const hasError = inputProps.errors && inputProps.errors.length;
    return (
      <StyledEditableInput>
        <div className="editableInputControl">
          <Input
            {...inputProps}
            value={this.state.nextValue}
            onChange={this.handleInputChange}
            addonAfter={
              showRemainingCharacterCount &&
              inputProps.maxLength &&
              String(inputProps.maxLength - this.state.nextValue.length)
            }
          />
          {/* {showRemainingCharacterCount &&
            inputProps.maxLength &&
            inputProps.maxLength - this.state.nextValue.length} */}
        </div>
        {!editOnEnter && (
          <React.Fragment>
            <Tag
              className="editableContentSaveBtn"
              type="action"
              onClick={!hasError && this.handleSave}
              disabled={hasError}
            >
              Save
            </Tag>
            <Tag
              className="editableContentCancelBtn"
              onClick={this.handleCancel}
            >
              Cancel
            </Tag>
          </React.Fragment>
        )}
      </StyledEditableInput>
    );
  }

  renderStaticComponent() {
    return (
      <StyledEditableContent className="editableContentWrapper">
        <div className="clearfix editableWrapper" onClick={this.toggleEditMode}>
          <div className="editableText">{this.props.value}</div>
          <Icon type="edit" />
        </div>
      </StyledEditableContent>
    );
  }

  render() {
    return this.state.editing
      ? this.renderEditingComponent()
      : this.renderStaticComponent();
  }
}

export default EditableContent;
