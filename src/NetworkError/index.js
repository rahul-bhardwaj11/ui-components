import React from 'react';
import PropTypes from 'prop-types';

import ErrorPage, { PAGE_TYPES } from '../ErrorPage';

import { reload } from '../utils';

import { ErrorCodes } from './constants';

const NetworkError = ({
  statusCode,
  children,
  unauthorisedRedirectionRoute,
  propsToPass
}) => {
  if (ErrorCodes.unauthorised.indexOf(statusCode) > -1) {
    return reload(unauthorisedRedirectionRoute);
  }

  if (ErrorCodes.forbidden.indexOf(statusCode) > -1) {
    return <ErrorPage {...propsToPass} pageType={PAGE_TYPES.FORBIDDEN} />;
  }

  if (
    ErrorCodes.serverErrors.indexOf(statusCode) > -1 ||
    ErrorCodes.badRequest.indexOf(statusCode) > -1
  ) {
    return (
      <ErrorPage {...propsToPass} pageType={PAGE_TYPES.INTERNAL_SERVER_ERROR} />
    );
  }

  if (ErrorCodes.notFound.indexOf(statusCode) > -1) {
    return <ErrorPage {...propsToPass} pageType={PAGE_TYPES.NOT_FOUND} />;
  }

  if (ErrorCodes.serviceUnavailable.indexOf(statusCode) > -1) {
    return (
      <ErrorPage {...propsToPass} pageType={PAGE_TYPES.SERVICE_UNAVAILABLE} />
    );
  }

  return children;
};

NetworkError.propTypes = {
  statusCode: PropTypes.number,
  propsToPass: PropTypes.shape(ErrorPage.propTypes),
  unauthorisedRedirectionRoute: PropTypes.string.isRequired
};

export default NetworkError;
