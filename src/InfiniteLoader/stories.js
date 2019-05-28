import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import InfiniteLoader from './index';

const stories = storiesOf('Infinite Loader', module);

const displayData = Array(40)
  .fill()
  .map((v, k) => {
    return k + 1;
  });

class App extends Component {
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      currentPage: 1,
      displayItemsPerPage: 10
    };
  }
  loadMore(page) {
    setTimeout(() => {
      this.setState({
        currentPage: page
      });
    }, 1000);
  }
  render() {
    const numberOfItems =
      this.state.currentPage * this.state.displayItemsPerPage;
    const items = displayData.slice(0, numberOfItems);
    const hasMore = numberOfItems < displayData.length;
    return (
      <InfiniteLoader loadMore={this.loadMore} hasMore={hasMore}>
        {items.map((v, k) => (
          <div
            key={k}
            style={{
              height: '100px',
              backgroundColor: '#a7a7a7',
              margin: '3px'
            }}
          />
        ))}
      </InfiniteLoader>
    );
  }
}

stories.add('Infinite Loader', () => <App />);
