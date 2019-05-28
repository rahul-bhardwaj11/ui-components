import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.scss';
class Draggable extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  componentDidMount() {
    this.attachEvents();
  }

  componentWillUnmount() {
    this.dragElem.removeEventListener('dragstart', this.dragStart);
    document.body.removeEventListener('dragover', this.dragOver);
    document.body.removeEventListener('dragenter', this.dragEnter);
    document.body.removeEventListener('drop', this.drop);
  }

  attachEvents() {
    this.dragElem.addEventListener('dragstart', this.dragStart, false);
    document.body.addEventListener('dragover', this.dragOver, false);
    document.body.addEventListener('dragenter', this.dragEnter, false);
    document.body.addEventListener('drop', this.drop, false);
  }

  dragStart = event => {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      'text',
      parseInt(style.getPropertyValue('left'), 10) -
        event.clientX +
        ',' +
        (parseInt(style.getPropertyValue('top'), 10) - event.clientY)
    );
  };

  dragEnter(event) {
    event.preventDefault();
  }

  dragOver = event => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  drop = event => {
    var offset = event.dataTransfer.getData('text').split(',');
    this.dragElem.style.left = event.clientX + parseInt(offset[0], 10) + 'px';
    this.dragElem.style.top = event.clientY + parseInt(offset[1], 10) + 'px';
    event.preventDefault();
    return false;
  };

  render() {
    return (
      <div
        draggable="true"
        ref={e => (this.dragElem = e)}
        className={style.drag}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
