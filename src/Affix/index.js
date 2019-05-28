import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntAffix from 'antd/lib/affix';
import 'antd/lib/affix/style/index.css';

class Affix extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children, ...rest } = this.props;
    return <AntAffix {...rest}>{children}</AntAffix>;
  }
}

export default Affix;
