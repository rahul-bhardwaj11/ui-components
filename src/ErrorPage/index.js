import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { isObject } from '../utils';

import StringToHTML from '../StringToHTML';
import Icon from '../Icon';
import mixins from '../styles/mixins';

import { PAGE_TYPES, PAGE_TYPES_CONFIG } from './constants';
import PrintError from './PrintError';

const ErrorpageWrapper = styled.div`
  text-align: center;

  .errorPageTitle {
    width: 200px;
    height: 64px;
    margin: 72px auto;
  }

  .errorPageIcon {
    margin: 0 auto;
  }

  .errorPageHeading {
    margin-top: 32px;
    ${mixins.h2()};
  }

  .errorPageDescription {
    margin-top: 12px;
    ${mixins.h3Grey()};
    font-weight: normal;
  }

  .errorPageActionButtons {
    margin-top: 32px;

    .errorCommonButtonStyling {
      margin: 0 4px;
    }
  }
`;

class ErrorPage extends Component {
  static propTypes = {
    styleTitle: PropTypes.string,
    styleIcon: PropTypes.string,
    styleHeading: PropTypes.string,
    styleDescription: PropTypes.string,
    styleActionButton: PropTypes.string,
    styleHeadingText: PropTypes.string,
    pageType: PropTypes.oneOfType([
      PropTypes.oneOf(Object.values(PAGE_TYPES)),
      PropTypes.shape({
        image: PropTypes.string,
        heading: PropTypes.string,
        description: PropTypes.string,
        buttons: PropTypes.func
      })
    ]).isRequired,
    showLogo: PropTypes.bool,
    reportError: PropTypes.func,
    tryAgain: PropTypes.func
  };
  static defaultProps = {
    onSearch: () => {},
    onPressEnter: () => {},
    showLogo: true
  };

  render() {
    const {
      styleTitle,
      styleIcon,
      styleHeading,
      styleDescription,
      styleActionButton,
      pageType,
      showLogo,
      reportError,
      tryAgain
    } = this.props;
    const pageInfo = isObject(pageType)
      ? pageType
      : PAGE_TYPES_CONFIG[pageType] || {};
    return (
      <ErrorpageWrapper>
        {showLogo && (
          <Icon
            gradient={true}
            className={cs('errorPageTitle', styleTitle)}
            type="mindtickleLogo"
          />
        )}
        <Icon
          gradient={true}
          type={pageInfo.image}
          className="errorPageIcon"
          style={{ ...styleIcon }}
        />
        <div className={cs('errorPageHeading', styleHeading)}>
          {pageInfo.heading}
        </div>
        <div className={cs('errorPageDescription', styleDescription)}>
          <StringToHTML content={pageInfo.description} />
        </div>
        {pageInfo.buttons(styleActionButton, reportError, tryAgain)}
      </ErrorpageWrapper>
    );
  }
}

export default ErrorPage;
export { PAGE_TYPES, PrintError };
