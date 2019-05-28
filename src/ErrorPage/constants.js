import React from 'react';
import cs from 'classnames';
import Button from '../Button';
import PropTypes from 'prop-types';
import { reload } from '../utils';

export const PAGE_TYPES = {
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  INTERNAL_SERVER_ERROR: '500',
  SERVICE_UNAVAILABLE: '503',
  CLIENT_ERROR: 'CLIENT_ERROR'
};

const ActionButtons = ({ reportError, tryAgain, styleActionButton }) => {
  return (
    <div className={cs('errorPageActionButtons', styleActionButton)}>
      <Button
        type="secondary"
        className="errorCommonButtonStyling"
        onClick={() => reload('/')}
      >
        Go to Home
      </Button>
      {reportError && (
        <Button type="secondary" className="errorCommonButtonStyling">
          Report Issue
        </Button>
      )}
      {tryAgain && (
        <Button type="secondary" className="errorCommonButtonStyling">
          Try Again
        </Button>
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  reportError: PropTypes.func,
  tryAgain: PropTypes.func,
  styleActionButton: PropTypes.string
};

export const PAGE_TYPES_CONFIG = {
  [PAGE_TYPES.NOT_FOUND]: {
    image: 'pageNotFound',
    heading: 'Page not found',
    description: "We can't seem to find the page you are looking for.",
    buttons: styleActionButton => (
      <ActionButtons styleActionButton={styleActionButton} />
    )
  },
  [PAGE_TYPES.INTERNAL_SERVER_ERROR]: {
    image: 'internalError',
    heading: 'Something went wrong',
    description:
      "Sorry your past request couldn't be completed <br /> Please try again after some time",
    buttons: (styleActionButton, reportError, tryAgain) => (
      <ActionButtons
        styleActionButton={styleActionButton}
        reportError={reportError}
        tryAgain={tryAgain}
      />
    )
  },
  [PAGE_TYPES.FORBIDDEN]: {
    image: 'internalError',
    heading: 'Access Denied',
    description: 'The content you are trying to access is restricted',
    buttons: styleActionButton => (
      <ActionButtons styleActionButton={styleActionButton} />
    )
  },
  [PAGE_TYPES.SERVICE_UNAVAILABLE]: {
    image: 'serviceUnavailable',
    heading: "It's not you. It's us",
    description:
      'Sorry our service is not available currently. <br />  Please try again after some time',
    buttons: (styleActionButton, reportError, tryAgain) => (
      <ActionButtons
        styleActionButton={styleActionButton}
        reportError={reportError}
        tryAgain={tryAgain}
      />
    )
  },
  [PAGE_TYPES.CLIENT_ERROR]: {
    image: 'serviceUnavailable',
    heading: 'Something went wrong',
    description:
      "Sorry your past request couldn't be completed <br /> Please try again after some time",
    buttons: (styleActionButton, reportError, tryAgain) => (
      <ActionButtons
        styleActionButton={styleActionButton}
        reportError={reportError}
        tryAgain={tryAgain}
      />
    )
  }
};
