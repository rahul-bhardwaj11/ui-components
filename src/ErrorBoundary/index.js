import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { isDebuggingEnabled, noop, IS_DEV } from '../utils';

import ErrorPage, { PAGE_TYPES, PrintError } from '../ErrorPage';

const initialState = { error: null, errorInfo: null, hasError: false };

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
    trackError: PropTypes.func,
    reportError: PropTypes.func
  };
  static defaultProps = {
    trackError: noop
  };
  state = initialState;

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo, hasError: true });

    if (!IS_DEV) this.props.trackError(error, errorInfo);
  }

  reload = () => {
    this.setState(initialState);
  };

  render() {
    const { error, errorInfo, hasError } = this.state;
    const { reportError } = this.props;
    if (hasError && (IS_DEV || isDebuggingEnabled())) {
      return <PrintError error={error} errorInfo={errorInfo} />;
    }

    if (hasError) {
      return (
        <React.Fragment>
          <ErrorPage
            pageType={PAGE_TYPES.CLIENT_ERROR}
            reportError={reportError}
            tryAgain={this.reload}
          />
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
