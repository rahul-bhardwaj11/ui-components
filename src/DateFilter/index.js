import React, { Component, createRef } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import CustomRangePicker from './customRangePicker';
import { RangePicker } from 'antd/lib/date-picker';
import moment from 'moment';

import {
  DATE_FILTER_OPTIONS,
  RANGE_PICKER_STATE,
  defaultFormatter
} from './dateFilterOptions';
import Dropdown from '../Dropdown';
import DateFilterStyle from './style';
import Icon from '../Icon';

const tomorrow = moment().add(1, 'd');
class DateFilter extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        resolver: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
          .isRequired
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    dateFormat: PropTypes.func,
    className: PropTypes.string,
    mobile: PropTypes.bool,
    value: PropTypes.array,
    openDropdown: PropTypes.bool
  };

  static defaultProps = {
    options: Object.keys(DATE_FILTER_OPTIONS).map(v => DATE_FILTER_OPTIONS[v]),
    placeholder: 'Date',
    onChange: () => {},
    mobile: false,
    disabledDate: startValue => {
      return !!startValue && startValue.valueOf() > tomorrow.valueOf();
    }
  };

  state = {
    date: null,
    dropdownVisible: false
  };
  ref = createRef();

  static getDerivedStateFromProps = ({ value }, { date }) => {
    let state = null;
    if (Array.isArray(value) && value.length === 2) {
      const from = value[0];
      const to = value[1];
      if (!date) {
        state = {
          date: {
            from,
            to,
            display: defaultFormatter(from, to)
          }
        };
      }
    }
    return state;
  };

  onSelect = key => {
    let date = this.props.options.find(v => v.key === key).resolver;
    this.setDate(date);
    date !== RANGE_PICKER_STATE && this.dropdownVisibilityChange(false);
  };

  setDate(date) {
    this.state.date !== date &&
      this.setState({ date }, () => {
        this.state.date &&
          this.state.date !== RANGE_PICKER_STATE &&
          this.props.onChange(
            this.state.date.from,
            this.state.date.to,
            this.state.date.display
          );
      });
  }

  onCustomDateSelect = ([from, to]) => {
    const date = {
      from,
      to,
      display: defaultFormatter(from, to)
    };
    this.setDate(date);
    this.dropdownVisibilityChange(false);
  };

  rangePickerBlur = () => {
    if (this.state.date === RANGE_PICKER_STATE) {
      this.setDate(null);
      this.dropdownVisibilityChange(false);
    }
  };

  dropdownVisibilityChange = dropdownVisible =>
    this.setState({ dropdownVisible });

  render() {
    let {
      options,
      placeholder: date,
      dateFormat,
      className,
      mobile,
      openDropdown,
      value, //eslint-disable-line
      ...rangePickerProps
    } = this.props;
    let { date: selectedDate, dropdownVisible } = this.state;
    const isDateSelected = selectedDate && selectedDate !== RANGE_PICKER_STATE;
    const dateInputClass = cs('dateInput', {
      dateSelected: isDateSelected,
      dateNotSelected: !isDateSelected,
      dropdownOpen: dropdownVisible && !isDateSelected
    });
    const dateRangeClass = cs('dateRangeDropdown', {
      mobile: mobile
    });
    if (isDateSelected) {
      date = dateFormat ? dateFormat(selectedDate) : selectedDate.display;
    }
    const dropDownProps = {
      ...(mobile && { visible: openDropdown })
    };
    const RangePickerComponent = mobile ? CustomRangePicker : RangePicker;
    return (
      <DateFilterStyle className={className} mobile={mobile}>
        <Dropdown
          onVisibleChange={this.dropdownVisibilityChange}
          placement="bottomLeft"
          options={options}
          trigger="click"
          onSelect={this.onSelect}
          {...dropDownProps}
        >
          <div ref={this.ref}>
            <div className={dateInputClass}>
              <span className="datePlaceholder">{date}</span>
              <Icon type="down_fillcaret" className="dateCaret" />
            </div>
          </div>
        </Dropdown>
        <RangePickerComponent
          {...rangePickerProps}
          open={selectedDate === RANGE_PICKER_STATE}
          onBlur={this.rangePickerBlur}
          onChange={this.onCustomDateSelect}
          getCalendarContainer={() => this.ref.current}
          dropdownClassName={dateRangeClass}
          style={{
            display: 'none'
          }}
        />
      </DateFilterStyle>
    );
  }
}

export { DATE_FILTER_OPTIONS };

export default DateFilter;
