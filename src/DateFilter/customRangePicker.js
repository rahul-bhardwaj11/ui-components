import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'antd/lib/date-picker';

class CustomRangePicker extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabledDate: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  state = {
    from: null
  };

  setStartDate = from => {
    this.dateClick = true;
    this.setState({
      from
    });
  };

  setEndDate = to => {
    this.dateClick = true;
    this.props.onChange([this.state.from, to]);
    this.setState({
      from: null
    });
  };

  disabledEndDate = date => {
    const disabled = this.props.disabledDate(date);
    if (!this.state.from || !date) {
      return false;
    }
    return disabled || date.valueOf() <= this.state.from.valueOf();
  };

  onBlur = () => {
    if (this.dateClick) {
      this.dateClick = false;
      return;
    }
    this.setState({
      from: null
    });
    this.props.onBlur();
  };

  render() {
    const { open, disabledDate, ...commonProps } = this.props;
    const startOpen = open && !this.state.from;
    const endOpen = !!(open && this.state.from);
    const commonCustomProps = {
      onBlur: this.onBlur
    };
    return (
      <Fragment>
        <DatePicker
          {...commonProps}
          {...commonCustomProps}
          open={startOpen}
          placeholder="Start"
          onChange={this.setStartDate}
          disabledDate={disabledDate}
        />
        <DatePicker
          {...commonProps}
          {...commonCustomProps}
          open={endOpen}
          placeholder="End"
          onChange={this.setEndDate}
          disabledDate={this.disabledEndDate}
        />
      </Fragment>
    );
  }
}

export default CustomRangePicker;
