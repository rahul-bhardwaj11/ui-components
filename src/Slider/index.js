import React, { Component } from 'react';
import AntSlider from 'antd/lib/slider';
import styled from 'styled-components';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/tooltip/style/index.css';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';

const isEmpty = value => {
  return typeof value === 'undefined' || value === null;
};

const getSliderMarkColor = (isEmpty, disabled) => {
  return isEmpty
    ? disabled
      ? theme.colors.ALTO
      : theme.colors.DARK_OUTER_SPACE
    : disabled
      ? theme.colors.SILVER
      : theme.colors.INDIGO;
};

const MARKER_SIZE = 18;

const MtSlider = styled.div`
  .toolTip {
    width: 100%;
    .ant-slider-with-marks {
      margin-bottom: 12px;
    }
    .ant-slider-handle {
      width: 20px;
      height: 20px;
      border: none;
      position: ${props => (props.range ? '' : 'relative')};
      background: transparent;
      margin-left: -8px;
      margin-top: -7px;
      border-radius: 0;
      :before {
        content: '';
        z-index: 2;
        top: 2px;
        left: 2px;
        border: ${({ disabled, isEmpty }) => {
          let borderColor = getSliderMarkColor(isEmpty, disabled);
          return `2px solid ${borderColor} !important`;
        }};
        background-color: ${({ disabled, isEmpty }) => {
          return getSliderMarkColor(isEmpty, disabled);
        }};
        ${mixins.size(`${MARKER_SIZE - 4}px`, `${MARKER_SIZE - 4}px`)};
        border-radius: 50%;
        display: block;
        position: absolute;
      }
      &:focus {
        box-shadow: 0 0 0 0 ${theme.colors.DARK_OUTER_SPACE};
        border: none;
      }
      &.ant-tooltip-open {
        &:hover {
          border: 2px solid ${props => props.type};
        }
      }
    }
  }
  .ant-slider-dot {
    width: ${MARKER_SIZE}px;
    height: ${MARKER_SIZE}px;
    top: -6px;
    margin-left: -7px;
    border: 0px;
    border-radius: 0px;
    background: transparent;
    :last-child {
      margin-left: -7px;
    }
    :before {
      position: absolute;
      left: 2px;
      top: 3px;
      background: white;
      width: ${MARKER_SIZE - 8}px;
      height: ${MARKER_SIZE - 8}px;
      border-radius: 50%;
      border: 2px solid ${theme.colors.ALTO};
      content: '';
    }
    &:hover {
      :before {
        border-color: ${theme.colors.OUTER_SPACE};
      }
    }
    &.ant-slider-dot-active {
      :before {
        border: 2px solid ${theme.colors.INDIGO};
      }
    }
    border-color: ${theme.colors.ALTO};
  }
  .ant-slider-rail {
    background: ${theme.colors.ALTO};
    height: 3px;
  }
  .ant-slider-track {
    background-color: ${theme.colors.INDIGO};
  }
  .ant-slider {
    &:hover {
      .ant-slider-track {
        background-color: ${theme.colors.INDIGO};
        border: 2px solid ${theme.colors.INDIGO};
      }
    }
  }
  .ant-slider-handle {
    :focus {
      box-shadow: none;
      border: none;
    }
  }
  .ant-tooltip-open {
    border: none;
  }

  .ant-slider-disabled {
    .ant-slider-dot {
      width: ${MARKER_SIZE}px;
      height: ${MARKER_SIZE}px;
      top: -6px;
      border: 0px;
      border-radius: 0px;
      background: transparent;
      :before {
        position: absolute;
        left: 2px;
        top: 3px;
        background: white;
        width: ${MARKER_SIZE - 8}px;
        height: ${MARKER_SIZE - 8}px;
        border-radius: 50%;
        border: 2px solid ${theme.colors.PEARL};
        content: '';
      }
    }
    cursor: default;
    .ant-slider-track {
      border: 2px solid ${theme.colors.SILVER} !important;
    }

    &.ant-slider:hover .ant-slider-track {
      border: 2px solid ${theme.colors.SILVER};
    }
    &:hover {
      .ant-slider-track {
        background-color: ${theme.colors.SILVER};
        &:hover {
          background-color: ${theme.colors.SILVER};
        }
      }
    }
    .ant-slider-disabled.ant-slider:hover .ant-slider-track {
      border: 2px solid ${theme.colors.SILVER};
    }
    .ant-slider-mark-text,
    .ant-slider-disabled .ant-slider-dot {
      cursor: default !important;
    }
  }
  .toolTipValue {
    position: absolute;
    bottom: 30px;
    left: calc(${props => props.handleLeft});
    transform: translateX(-${props => props.handleLeft});
    ${mixins.darkText()};
    text-align: center;
  }
  .ant-slider-disabled {
    .ant-slider-rail {
      background-color: ${theme.colors.PEARL};
    }
    .ant-slider-dot-active {
      :before {
        border: 2px solid ${theme.colors.SILVER};
      }
    }
  }
`;

const SLIDER_STEP_CLASS = 'ant-slider-step',
  SLIDER_MARK_CLASS = 'ant-slider-dot',
  SLIDER_TOOLTIP_CLASS = 'ant-tooltip-inner',
  SLIDER_HANDLE_CLASS = 'ant-slider-handle';

class Slider extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    step: PropTypes.number,
    marks: PropTypes.object,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    tooltipTimeout: PropTypes.number,
    range: PropTypes.bool,
    getPopupContainer: PropTypes.func
  };

  static defaultProps = {
    tooltipTimeout: 3000,
    onChange: () => {},
    step: 1,
    getPopupContainer: () => document.body
  };

  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      marks: this.formatMarks(),
      value: !isEmpty(props.value) ? props.value : props.defaultValue
    };
  }

  formatMarks = () => {
    const { min, max, marks, step } = this.props;
    if (!marks) return {};

    let newMarks = {};
    for (let i = min; i <= max; i += step) {
      newMarks[i] = marks[i] ? marks[i] : { tooltip: i };
    }
    return newMarks;
  };

  percentageToMarksMap = {};

  componentDidMount() {
    if (this.isTooltipEnabled()) {
      this.calculatePercentageToMark();
    }
    let handle = this.getHandleNode();
    const handleLeft = handle && handle.style.left;
    this.setState({ handleLeft });
  }

  calculatePercentageToMark = () => {
    const { step, min } = this.props;
    const marksNodeParent = this.ref.getElementsByClassName(SLIDER_STEP_CLASS);
    const marksNodes = marksNodeParent[0].children;
    let mark = min;
    for (let i = 0; i < marksNodes.length; i++) {
      var percentageLeft = marksNodes[i].style.left;
      this.percentageToMarksMap[percentageLeft] = mark;
      mark += step;
    }
  };

  isTooltipEnabled = () => {
    const { marks } = this.props;
    return marks ? true : false;
  };

  setTooltipWidth = () => {
    if (!this.tooltipRef) return;
    var tooltipContent = this.tooltipRef
      .getRef()
      .getElementsByClassName(SLIDER_TOOLTIP_CLASS);
    let contentWidth = tooltipContent[0] && tooltipContent[0].clientWidth;

    if (contentWidth != this.state.contentWidth) {
      this.setState({ contentWidth });
    }
  };

  handleHover = e => {
    const { showTooltip, persistTooltip } = this.state;
    if (!this.isTooltipEnabled()) return;
    const targetClass = e.target.className.split(' ');
    if (
      targetClass.includes(SLIDER_MARK_CLASS) ||
      targetClass.includes(SLIDER_HANDLE_CLASS)
    ) {
      let tooltipState = this.getTooltipState(e.target);
      if (persistTooltip && targetClass.includes(SLIDER_MARK_CLASS)) {
        clearTimeout(this.tooltipTimerId);
        tooltipState.persistTooltip = false;
      }
      this.setState({ ...tooltipState });

      setTimeout(() => {
        this.setTooltipWidth();
      }, 0);
      return;
    }
    !persistTooltip && showTooltip && this.setState({ showTooltip: false });
  };

  getTooltipState = node => {
    const offsetLeft = node.getBoundingClientRect().left + MARKER_SIZE / 2;
    const leftPercentage = node.style.left;
    const mark = this.percentageToMarksMap[leftPercentage];
    const title = this.state.marks[mark].tooltip
      ? this.state.marks[mark].tooltip
      : mark + '';
    let tooltipState = {
      showTooltip: true,
      offsetLeft,
      title
    };
    return tooltipState;
  };

  setHandleValueAndTooltip = value => {
    const { tooltipTimeout } = this.props;
    this.setState({ value }, () => {
      const handle = this.getHandleNode();
      const handleLeft = handle && handle.style.left;
      const isTooltipEnabled = this.isTooltipEnabled();
      const tooltipState = isTooltipEnabled ? this.getTooltipState(handle) : {};
      this.setState({ handleLeft, ...tooltipState, persistTooltip: true });

      if (isTooltipEnabled) {
        setTimeout(() => {
          this.setTooltipWidth();
        }, 0);

        if (this.tooltipTimerId) {
          clearTimeout(this.tooltipTimerId);
        }
        this.tooltipTimerId = setTimeout(() => {
          this.setState({ persistTooltip: false, showTooltip: false });
        }, tooltipTimeout);
      }
    });
  };

  onChange = value => {
    const { onChange } = this.props;
    onChange(value);
    this.setHandleValueAndTooltip(value);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setHandleValueAndTooltip(nextProps.value);
    }
  }

  getHandleNode = () => {
    if (!this.ref) return;
    let handle = this.ref.getElementsByClassName(SLIDER_HANDLE_CLASS);
    let handleNode = handle && handle[0];
    return handleNode;
  };

  handleBlur = () => {
    const { disabled } = this.props;
    if (!disabled) {
      return;
    }
    clearTimeout(this.tooltipTimerId);
    this.setState({
      showTooltip: false
    });
  };

  handleMouseLeave = () => {
    const { showTooltip, persistTooltip } = this.state;
    !persistTooltip && showTooltip && this.setState({ showTooltip: false });
  };

  render() {
    const {
      disabled,
      defaultValue,
      min,
      max,
      range,
      getPopupContainer
    } = this.props;
    const {
      offsetLeft,
      showTooltip,
      contentWidth,
      title,
      marks,
      handleLeft,
      value
    } = this.state;
    const offset = contentWidth / 2 || 0;
    const toolTipLeftPos = `calc(${offsetLeft}px - ${offset}px)`;
    return (
      <MtSlider
        isEmpty={isEmpty(value) && isEmpty(defaultValue)}
        offsetLeft={offsetLeft}
        offset={contentWidth / 2 || 0}
        handleLeft={handleLeft}
        disabled={disabled}
        range={range}
      >
        <div
          tabIndex={-1}
          onBlur={this.handleBlur}
          onMouseOver={this.handleHover}
          onMouseLeave={this.handleMouseLeave}
          style={{ position: 'relative' }}
          ref={el => {
            if (el) this.ref = el;
          }}
        >
          <Tooltip
            title={title}
            visible={showTooltip}
            className="toolTip"
            style={{ left: toolTipLeftPos }}
            getPopupContainer={getPopupContainer}
            ref={el => (this.tooltipRef = el)}
          >
            <div>
              {disabled && (
                <div className="toolTipValue">
                  {value != min && value != max ? value : ''}
                </div>
              )}
              <AntSlider
                {...this.props}
                marks={marks}
                tipFormatter={null}
                onChange={this.onChange}
                value={value}
              />
            </div>
          </Tooltip>
        </div>
      </MtSlider>
    );
  }
}
export default Slider;
