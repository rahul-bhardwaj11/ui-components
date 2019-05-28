import React, { Component } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import Loader from '../Loader';

export default class InfiniteLoader extends Component {
  static propTypes = { ...InfiniteScroller.propTypes };
  static defaultProps = {
    loader: <Loader key="5647382910-loader" size="sizeXSmall" /> // has to be unique
  };
  render() {
    return <InfiniteScroller {...this.props} />;
  }
}
