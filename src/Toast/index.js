import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import mixins from '../styles/mixins';
import {
  DEFAULT_HIDE_TIMER,
  ANIMATION_TRANSITION_DURATION,
  TOAST_REMOVE_TIME
} from './constants';
import StyledToast from './css';

export const TOAST_TYPES = ['success', 'warning', 'error', 'info', 'loading'];

const ReloadBtn = () => {
  return (
    <div
      className={classnames('toastReloadBtn')}
      onClick={() => {
        window.location.href = window.location.href; // eslint-disable-line
      }}
    >
      Reload
    </div>
  );
};

const HideBtn = ({ hide }) => {
  return (
    <div className={classnames('floatR', 'link')} onClick={hide}>
      Hide
    </div>
  );
};

const FreezeOverlay = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: mixins.zIndex.OVERLAY
      }}
    />
  );
};

HideBtn.propTypes = {
  hide: PropTypes.func.isRequired
};

export default class Toast extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(TOAST_TYPES),
    hideBtn: PropTypes.bool,
    reloadBtn: PropTypes.bool,
    freeze: PropTypes.bool,
    autoHide: PropTypes.bool,
    timeout: PropTypes.number,
    onHide: PropTypes.func
  };
  static defaultProps = {
    timeout: DEFAULT_HIDE_TIMER,
    autoHide: true,
    hideBtn: false,
    freeze: false,
    load: false
  };
  state = {
    timer: null
  };

  element = null;
  constructor(props) {
    super(props);
    const { freeze } = props;
    if (freeze) {
      this.element = document.createElement('div');
    }
  }

  style = {
    transitionDuration: `${ANIMATION_TRANSITION_DURATION}ms`
  };

  removeToast = () => setTimeout(this.props.onHide, TOAST_REMOVE_TIME);

  stopTimer = () => {
    let { timer } = this.state;
    if (timer) {
      clearTimeout(timer);
      this.setState({ timer: null });
    }
  };

  hideToast = () => {
    this.stopTimer();
    this.removeToast();
    this.mountOn && ReactDOM.unmountComponentAtNode(this.mountOn);
  };

  startTimer = time => {
    let { timer } = this.state;
    this.stopTimer();
    timer = setTimeout(() => {
      this.setState({ timer: null });
      this.removeToast();
    }, time);
    this.setState({ timer });
  };

  handleTimer = props => {
    const { autoHide, freeze, timeout } = props;
    if (freeze) {
      this.stopTimer();
    } else if (autoHide) {
      this.startTimer(timeout);
    }
  };

  getClasses = () => {
    const { timer } = this.state;
    const { type, autoHide, freeze } = this.props;

    return classnames({
      toast: true,
      show: freeze || (autoHide && timer) || !autoHide,
      [`toast-${type}`]: true,
      clearfix: true
    });
  };

  componentWillReceiveProps(newProps) {
    this.handleTimer(newProps);
  }

  componentDidMount() {
    const { freeze } = this.props;
    this.handleTimer(this.props);
    freeze && document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    const { freeze } = this.props;
    if (freeze) {
      document.body.removeChild(this.element);
    }
  }

  render() {
    const { message, hideBtn, reloadBtn, freeze } = this.props;
    return (
      <React.Fragment>
        {freeze && ReactDOM.createPortal(<FreezeOverlay />, this.element)}
        <StyledToast>
          <div className={this.getClasses()} style={this.style}>
            <span className="toastMessage">{message}</span>
          </div>
          <span>{hideBtn && !freeze && <HideBtn hide={this.hideToast} />}</span>
          <span className="styleToastBtn">
            {freeze && reloadBtn && <ReloadBtn />}
          </span>
        </StyledToast>
      </React.Fragment>
    );
  }
}

function addBodyOverflow(overflow) {
  document.getElementsByTagName('body')[0].style.overflow = overflow;
}

let MountOn;
const show = ({ message, type = 'success', freeze, mountId, ...rest }) => {
  mountId = mountId || 'toast';
  MountOn = document.getElementById(mountId);
  if (!MountOn) {
    return;
  }
  if (message) {
    ReactDOM.render(
      <Toast
        message={message}
        type={type}
        onHide={hideToast}
        {...rest}
        freeze={freeze}
      />,
      MountOn
    );
  }
  freeze && addBodyOverflow('hidden');
};

export function hideToast() {
  if (!MountOn) {
    return;
  }
  ReactDOM.render(null, MountOn);
  addBodyOverflow('auto');
}

export const errorToast = ({ message, ...rest }) => {
  show({ message, type: 'error', ...rest });
};
export const successToast = ({ message, ...rest }) => {
  show({ message, type: 'success', ...rest });
};
export const warningToast = ({ message, ...rest }) => {
  show({ message, type: 'warning', ...rest });
};
export const infoToast = ({ message, ...rest }) => {
  show({ message, type: 'info', ...rest });
};
export const loadingToast = ({ message, ...rest }) => {
  show({ message, type: 'loading', ...rest });
};
