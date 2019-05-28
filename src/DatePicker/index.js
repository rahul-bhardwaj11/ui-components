import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import AntDatePicker from 'antd/lib/date-picker';
import Icon from '../Icon';
import 'antd/lib/input/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import styled from 'styled-components';
import moment from 'moment';
import theme from '../styles/theme';

const StyledDatePicker = styled.div`
  font-family: inherit;
  .ant-calendar-picker-container {
    font-family: inherit;
    z-index: 9999;
  }
  .ant-calendar-selected-day {
    .ant-calendar-date {
      background: ${theme.colors.INDIGO};
      border: 1px solid ${theme.colors.INDIGO};
      border-radius: 4px;
      color: #fff;
    }
  }
  .ant-calendar-last-month-cell {
    .ant-calendar-date {
      color: ${theme.colors.OUTER_SPACE};
    }
  }
  .ant-calendar-date {
    color: ${theme.colors.DARK_OUTER_SPACE};
    font-size: 12px;
    font-weight: 600;

    &:hover {
      background: ${theme.colors.INDIGO};
      border: 1px solid ${theme.colors.INDIGO};
      border-radius: 4px;
      color: #fff;
    }
  }
  .ant-calendar-column-header-inner {
    color: ${theme.colors.OUTER_SPACE};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .ant-calendar-next-month-btn-day .ant-calendar-date {
    color: ${theme.colors.OUTER_SPACE};
  }
`;

const StyleSelectCalendar = styled.span`
  position: relative;
  .ant-input {
    &:hover {
      border: 1px solid ${theme.colors.INDIGO};
    }
    &:focus {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .ant-calendar-picker-input {
    z-index: 1;
    background: transparent;
    padding-right: 20px;
  }
  .ant-calendar-picker-icon,
  .ant-calendar-picker-clear {
    display: none;

    &:hover {
      display: none;
    }
  }
  .customCalendarIcon {
    position: absolute;
    right: 7px;
    top: 2px;
    color: ${theme.colors.OUTER_SPACE};
  }
`;

const noop = () => undefined;

class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const mountOn = document.body.appendChild(document.createElement('div'));
    ReactDOM.render(
      <StyledDatePicker innerRef={e => (this.datePickerContainer = e)} />,
      mountOn
    );
  }

  static defaultProps = {
    onChange: noop
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        date: nextProps.value ? moment(nextProps.value) : undefined
      });
    }
  }

  state = {
    date: this.props.value ? moment(this.props.value) : undefined
  };

  onChange = date => {
    this.setState({ date });
    this.props.onChange(+date);
  };

  render() {
    return (
      <StyleSelectCalendar>
        <AntDatePicker
          {...this.props}
          value={this.state.date}
          onChange={this.onChange}
          iconSource={this.timeIcon}
          showToday={false}
          getCalendarContainer={() => this.datePickerContainer}
        />
        <Icon type="editSchedule" className="customCalendarIcon" />
      </StyleSelectCalendar>
    );
  }
}

export default DatePicker;
