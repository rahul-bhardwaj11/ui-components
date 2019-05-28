import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.scss';

class TracksList extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    tracks: PropTypes.array,
    selectedTrack: PropTypes.number
  };

  onClickHandler = selectedIndex => {
    this.props.onSelect(selectedIndex);
  };

  render() {
    const { tracks, selectedTrack } = this.props;
    return (
      <ul className={style.trackContainer}>
        {/* eslint-disable*/
        tracks.map((track, i) => {
          let kClass = '';
          if (selectedTrack === i) {
            kClass = style.active;
          }
          return (
            <li
              className={[style.eachTrack, kClass].join(' ')}
              key={i}
              onClick={this.onClickHandler.bind(this, i)}
            >
              {track.label}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TracksList;
