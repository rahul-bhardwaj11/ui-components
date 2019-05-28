import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/avatar/style/index.css';
import mixin from '../styles/mixins';

const MtUserThumbnail = styled.div`
  .userThumbnailAvatar {
    float: left;
  }
  .userThumbnailInfo {
    height: 40px;
    margin-left: 56px;
    cursor: default;

    .title {
      ${mixin.blackLink()};
      ${mixin.truncate()};
      .alertMsg {
        ${mixin.smallDarkLink()};
      }
    }
    .content {
      ${mixin.darkText()};
      ${mixin.truncate()};
    }
  }
`;

const ThumbnailInfoWrapper = styled.div`
  .wrapper {
    display: table;
    table-layout: fixed;
    border-spacing: 0px;
    height: 40px;
    width: 100%;
  }
  .info {
    vertical-align: middle;
    display: table-cell;
    width: 100%;
  }
`;

class UserThumbnailInfo extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    message: PropTypes.shape({
      msg: PropTypes.string,
      style: PropTypes.object
    }),
    className: PropTypes.string
  };

  render() {
    const { className, title, content, message } = this.props;

    return (
      <ThumbnailInfoWrapper className={className}>
        <div className="wrapper">
          <div className="info">
            <div className={'title'}>
              {title && <span className="marginR6">{title}</span>}
              {message && (
                <span style={message.style} className="alertMsg">
                  {message.msg}
                </span>
              )}
            </div>
            {content && <div className={'content'}>{content}</div>}
          </div>
        </div>
      </ThumbnailInfoWrapper>
    );
  }
}

class UserThumbnail extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    message: PropTypes.shape({
      msg: PropTypes.string,
      style: PropTypes.object
    }),
    src: PropTypes.string,
    shape: PropTypes.oneOf(['circle', 'square']),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.string,
    expanded: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    shape: 'circle',
    size: 'large',
    expanded: false
  };

  getInitials = name => {
    var initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || '') + (initials.pop() || '')
    ).toUpperCase();
    return initials;
  };

  render() {
    const { expanded, className, icon, children, ...rest } = this.props;
    const { title } = rest;

    let mtProps = Object.assign({}, rest);
    mtProps =
      !title && !children
        ? Object.assign(mtProps, { icon: icon || 'user' })
        : mtProps;
    return (
      <MtUserThumbnail className={className}>
        <Avatar className="userThumbnailAvatar" {...mtProps}>
          {!children && title && this.getInitials(title)}
          {children}
        </Avatar>
        {expanded && (
          <UserThumbnailInfo {...rest} className="userThumbnailInfo" />
        )}
      </MtUserThumbnail>
    );
  }
}

export { Avatar };

export default UserThumbnail;
