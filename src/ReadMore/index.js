import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mixins from '../styles/mixins';
import trunc from 'trunc-html';
import CircleSvg from '../styles/icons/circle.svg';
//import { min } from 'moment';

const ALLOWED_HTML_TAGS = [
  'u',
  'a',
  'abbr',
  'article',
  'b',
  'blockquote',
  'br',
  'caption',
  'code',
  'del',
  'details',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'ins',
  'kbd',
  'li',
  'main',
  'mark',
  'ol',
  'p',
  'pre',
  'section',
  'span',
  'strike',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul'
];

const MTReadMore = styled.div`
  line-height: initial;
  p {
    margin-bottom: 0;
  }
  ul,
  ol {
    list-style: none;
    counter-reset: my-sec-counter;
  }

  li {
    position: relative;
    padding-left: 20px;
  }

  ul li:before {
    position: absolute;
    left: 0;
    top: 0;
    content: url(${CircleSvg});
    transform: scale(0.6);
    opacity: 0.6;
  }
  ol li:before {
    position: absolute;
    left: 0;
    top: 0;
    counter-increment: my-sec-counter;
    content: counter(my-sec-counter) '.';
    transform: scale(1);
  }
  .trunc-text {
    max-height: ${props => {
      return `${props.truncateHeight}px`;
    }};
    overflow: hidden;
  }
  .viewMore,
  .viewLess {
    margin: 10px 0px;
    display: block;
    ${mixins.actionLink()};
  }
  .linkText {
    ${mixins.actionLink()};
  }
`;

class ReadMore extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      heightTruncated: false
    };
    this.toggleLines = this.toggleLines.bind(this);
  }

  toggleLines(event) {
    event.preventDefault();
    this.props.onToggle({ expanded: !this.state.expanded });
    this.setState({
      expanded: !this.state.expanded
    });
  }

  componentDidMount() {
    const { truncateHeight } = this.props;
    if (!truncateHeight) {
      return;
    }
    if (this.ref && this.ref.scrollHeight > truncateHeight) {
      this.setState({
        heightTruncated: true
      });
    }
  }

  render() {
    const {
      showViewMore,
      moreText,
      lessText,
      className,
      html,
      limit,
      truncateHeight
    } = this.props;
    let truncated = false;
    let { expanded, heightTruncated } = this.state;
    var truncateHTML = trunc(html, limit, {
      sanitizer: {
        allowedTags: ALLOWED_HTML_TAGS
      }
    });
    const indexOf = truncateHTML.text.indexOf('…');
    if (indexOf > truncateHTML.text.length - 4) {
      truncated = true;
    }
    truncated = truncated || heightTruncated;

    return (
      <MTReadMore className={className} truncateHeight={truncateHeight}>
        {!expanded && (
          <div className="trunc-text" ref={e => (this.ref = e)}>
            <span dangerouslySetInnerHTML={{ __html: truncateHTML.html }} />
          </div>
        )}
        {expanded && <span dangerouslySetInnerHTML={{ __html: html }} />}
        {showViewMore &&
          truncated &&
          !expanded && (
            <div className="viewMore" key="view_more">
              <a className="linkText" onClick={this.toggleLines}>
                {moreText}
              </a>
            </div>
          )}
        {expanded &&
          showViewMore && (
            <span className="viewLess">
              <a className="linkText" onClick={this.toggleLines}>
                {' '}
                {lessText}
              </a>
            </span>
          )}
      </MTReadMore>
    );
  }
}

ReadMore.defaultProps = {
  limit: 500,
  moreText: 'Read More',
  lessText: 'Read Less',
  showViewMore: true,
  truncateHeight: 100,
  onToggle: () => {}
};

ReadMore.propTypes = {
  limit: PropTypes.number,
  moreText: PropTypes.string,
  lessText: PropTypes.string,
  showViewMore: PropTypes.bool,
  className: PropTypes.string,
  html: PropTypes.string,
  onToggle: PropTypes.func,
  truncateHeight: PropTypes.number
};

export default ReadMore;
