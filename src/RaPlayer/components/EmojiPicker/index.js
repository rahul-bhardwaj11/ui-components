import React, { Component } from 'react';
import style from './index.scss';
import smileyImage from '../../images/smiley@2x.png';

const SUPPORTED_EMOJIS = [
  // 0x1f601,
  // 0x1f621,
  // 0x1f602,
  // 0x1f609,
  0x1f44d,
  0x1f60a,
  // 0x1f648,
  // 0x1f62c,
  // 0x1f61d,
  // 0x1f618,
  // 0x1f49b,
  // 0x1f60d,
  // 0x1f638,
  // 0x1f614,
  // 0x1f62d,
  // 0x1f48b,
  // 0x1f612,
  // 0x1f633,
  // 0x1f61c,
  0x1f603
  // 0x1f622,
  // 0x1f631,
  // 0x1f60f,
  // 0x1f61e,
  // 0x1f605,
  // 0x1f61a,
  // 0x1f64a,
  // 0x1f60c,
  // 0x1f600,
  // 0x1f61d
];

class EmojiPicker extends Component {
  constructor() {
    super();
    this.emojiClickHandler = this.emojiClickHandler.bind(this);
    this.emojiSelectHandler = this.emojiSelectHandler.bind(this);
    this.state = {
      showEmojiList: false
    };
    this.addPolyfill();
  }

  addPolyfill() {
    /* eslint-disable */
    /*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
    if (!String.fromCodePoint) {
      (function() {
        var defineProperty = (function() {
          // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result =
              $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {}
          return result;
        })();
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var fromCodePoint = function(_) {
          var MAX_SIZE = 0x4000;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return '';
          }
          var result = '';
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (
              !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 0x10ffff || // not a valid Unicode code point
              floor(codePoint) != codePoint // not an integer
            ) {
              throw RangeError('Invalid code point: ' + codePoint);
            }
            if (codePoint <= 0xffff) {
              // BMP code point
              codeUnits.push(codePoint);
            } else {
              // Astral code point; split in surrogate halves
              // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xd800;
              lowSurrogate = (codePoint % 0x400) + 0xdc00;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        if (defineProperty) {
          defineProperty(String, 'fromCodePoint', {
            value: fromCodePoint,
            configurable: true,
            writable: true
          });
        } else {
          String.fromCodePoint = fromCodePoint;
        }
      })();
    }
    /* eslint-disable */
  }

  emojiClickHandler(event) {
    this.show = !this.show;
    this.setState({
      showEmojiList: this.show
    });
    event.stopPropagation();
  }

  emojiSelectHandler(event) {
    this.setState({
      showEmojiList: false
    });
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(event.target.innerHTML);
    }
  }

  render() {
    let { showEmojiList } = this.state;
    let { toLeft } = this.props;
    let emojiListStyle = {};
    toLeft ? (emojiListStyle.left = '2px') : (emojiListStyle.right = '2px');
    return (
      <div className={style.posRel} style={{ width: '15px' }}>
        <div className={style.emojiSelector} onClick={this.emojiClickHandler}>
          <img src={smileyImage} style={{ height: '15px' }} />
        </div>

        {showEmojiList && (
          <div className={style.emojiList} style={emojiListStyle}>
            <ul>
              {SUPPORTED_EMOJIS.map((item, i) => {
                return (
                  <li onClick={this.emojiSelectHandler} key={i}>
                    {String.fromCodePoint(item)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default EmojiPicker;
