import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntTag from 'antd/lib/tag';
import 'antd/lib/tag/style/index.css';
import Icon from '../Icon';
import MtTag, { TYPES, MtCheckableTag } from './style';

const ICON_TYPE = {
  [TYPES.ADD]: 'add',
  [TYPES.ADDED]: 'cross',
  [TYPES.SELECTION]: 'tick'
};

class Tag extends Component {
  static propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    applied: PropTypes.bool,
    disabled: PropTypes.bool,
    checkable: PropTypes.bool,
    padding: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    closable: PropTypes.bool
  };

  static defaultProps = {
    type: TYPES.NORMAL,
    onClick: () => {}
  };

  render() {
    let {
      children,
      type,
      checkable,
      checked,
      onChange,
      closable,
      ...rest
    } = this.props;

    let Tag = checkable ? MtCheckableTag : MtTag;

    let checkableTagProps = {
      checked,
      onChange
    };
    let TagProps = {
      type,
      checkable: checkable ? 1 : 0,
      closable: closable ? 1 : 0,
      ...rest
    };

    return (
      <Tag {...TagProps} {...checkableTagProps}>
        {children}
        {ICON_TYPE[type] && (
          <Icon
            type={ICON_TYPE[type]}
            className={ICON_TYPE[type] ? 'tagIcon' : ''}
          />
        )}
      </Tag>
    );
  }
}

Tag.CheckableTag = AntTag.CheckableTag;
export default Tag;
