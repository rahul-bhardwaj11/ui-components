import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import UpdateBtns from './updateBtns';
import Toolbar from './toolbar';
import { FORMATS, VIEW_TYPES, FULL_TOOLBAR } from '../constants';

const noop = () => undefined;
export default class Editor extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    showButtons: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    availableLength: PropTypes.number.isRequired,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    scrollingContainer: PropTypes.string,
    type: PropTypes.string
  };
  static defaultProps = {
    onMount: noop
  };
  onChange = value => {
    this.quillRef && this.props.onChange(value, this.quillRef.editor);
  };
  componentDidMount() {
    if (this.quillRef) {
      this.props.onMount(this.props.value, this.quillRef.getEditor(), false);
    }
  }
  render() {
    const {
      showButtons,
      helpers,
      value,
      availableLength,
      id,
      placeholder,
      readOnly,
      scrollingContainer,
      type
    } = this.props;
    const toolbarId = `${id}-toolbar`;
    let modules = {};
    modules.toolbar = readOnly
      ? false
      : type == VIEW_TYPES.FULL
        ? FULL_TOOLBAR
        : {
            container: `#${toolbarId}`
          };

    return (
      <React.Fragment>
        {!readOnly && type != VIEW_TYPES.FULL && <Toolbar id={toolbarId} />}
        <ReactQuill
          ref={el => {
            this.quillRef = el;
          }}
          scrollingContainer={scrollingContainer}
          readOnly={readOnly}
          placeholder={placeholder}
          defaultValue={value}
          onChange={this.onChange}
          modules={modules}
          formats={FORMATS}
        />
        {!readOnly && (
          <div className="customLength">{availableLength} Char</div>
        )}
        {showButtons && <UpdateBtns {...helpers} />}
      </React.Fragment>
    );
  }
}
