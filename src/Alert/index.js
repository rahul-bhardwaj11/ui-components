import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import StyleAlertBox from './style';

const noop = () => undefined;
class AlertBox extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    removeAlert: PropTypes.func.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    callback: PropTypes.func,
    type: PropTypes.oneOf(['Confirm', 'Alert'])
  };
  static defaultProps = {
    callback: noop
  };
  close = action => {
    const { id, removeAlert, callback } = this.props;
    callback(!!action);
    removeAlert(id);
  };
  render() {
    let { children, type } = this.props;
    let footer;
    if (type === 'Alert') {
      footer = null;
    }
    return (
      <StyleAlertBox
        footer={footer}
        onCancel={() => {
          this.close(false);
        }}
        onOk={() => {
          this.close(true);
        }}
        visible={true}
      >
        <div className="getHelpMsg">{children}</div>
      </StyleAlertBox>
    );
  }
}

class Alert extends Component {
  state = {
    alerts: []
  };

  show = (message = '', { confirm, ...rest } = {}) => {
    const alert = {
      id: nanoid(7),
      message,
      type: confirm ? 'Confirm' : 'Alert',
      ...rest
    };

    this.setState(prevState => ({
      alerts: prevState.alerts.concat(alert)
    }));
    return alert.id;
  };

  removeAll = () => {
    const alertsRemoved = this.state.alerts;
    this.setState({ alerts: [] });
    alertsRemoved.forEach(alert => alert.onClose && alert.onClose());
  };

  removeAlert = id => {
    const alertRemoved = this.state.alerts.filter(alert => alert.id === id)[0];
    this.setState(prevState => ({
      alerts: prevState.alerts.filter(alert => alert.id !== id)
    }));
    alertRemoved && alertRemoved.onClose && alertRemoved.onClose();
  };
  renderAlerts = () => {
    return this.state.alerts.map(alert => {
      return (
        <AlertBox {...alert} key={alert.id} removeAlert={this.removeAlert}>
          {alert.message}
        </AlertBox>
      );
    });
  };
  render() {
    return this.renderAlerts();
  }
}

export default Alert;
