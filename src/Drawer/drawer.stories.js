import React from 'react';

import { storiesOf } from '@storybook/react';
import Drawer from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Drawer', module);
stories.addDecorator(withKnobs);

class DrawerStory extends React.Component {
  state = { visible: false };
  container = null;
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '300px', height: '600px' }} id="container">
          <label onClick={this.showDrawer}>Open</label>
        </div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={() => document.getElementById('container')}
          mask={false}
          className="drawer"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </React.Fragment>
    );
  }
}
stories.add('Drawer', withInfo('Drawer story')(() => <DrawerStory />));
