import moment from 'moment';
const RANGE_PICKER_STATE = 'range-picker';

export const defaultFormatter = (from, to) =>
  `${from.format("D MMM' YY")} ~ ${to.format("D MMM' YY")}`;

const yesterday = moment().subtract(1, 'days');

const lastWeek = moment().subtract(1, 'week');
const lastWeekFrom = moment(lastWeek).startOf('isoweek');
const lastWeekTo = moment(lastWeek).endOf('isoweek');

const lastMonth = moment().subtract(1, 'month');

const lastQuarter = moment().subtract(1, 'Q');
const lastQuarterFrom = moment(lastQuarter).startOf('Q');
const lastQuarterTo = moment(lastQuarter).endOf('Q');

const DATE_FILTER_OPTIONS = {
  DAY: {
    key: '0',
    content: 'Yesterday',
    resolver: {
      from: moment(yesterday).startOf('day'),
      to: moment(yesterday).endOf('day'),
      display: yesterday.format("D MMMM' YY")
    }
  },
  WEEK: {
    key: '1',
    content: 'Last Week',
    resolver: {
      from: lastWeekFrom,
      to: lastWeekTo,
      display: defaultFormatter(lastWeekFrom, lastWeekTo)
    }
  },
  MONTH: {
    key: '2',
    content: 'Last Month',
    resolver: {
      from: moment(lastMonth).startOf('month'),
      to: moment(lastMonth).endOf('month'),
      display: `${lastMonth.format('MMMM, YY')}`
    }
  },
  QUARTER: {
    key: '3',
    content: 'Last Quarter',
    resolver: {
      from: lastQuarterFrom,
      to: lastQuarterTo,
      display: defaultFormatter(lastQuarterFrom, lastQuarterTo)
    }
  },
  CUSTOM: {
    key: '4',
    content: 'Custom Range',
    resolver: RANGE_PICKER_STATE
  }
};

export { DATE_FILTER_OPTIONS, RANGE_PICKER_STATE };
