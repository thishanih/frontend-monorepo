import moment, { type Moment } from 'moment';

export interface DashboardDateRange {
  startDate: string;
  endDate: string;
}

export interface DashboardDateSelection {
  from: Date;
  to: Date;
}

const dashboardDateFormat = 'YYYY-MM-DD';

export const getDashboardDateRange = (today = moment()): DashboardDateRange => ({
  startDate: today.clone().startOf('year').format(dashboardDateFormat),
  endDate: today.clone().format(dashboardDateFormat),
});

export const getDashboardDateSelection = (today = moment()): DashboardDateSelection => ({
  from: today.clone().startOf('year').toDate(),
  to: today.clone().endOf('day').toDate(),
});

export const formatDashboardDateRange = ({
  from,
  to,
}: DashboardDateSelection): DashboardDateRange => ({
  startDate: moment(from).format(dashboardDateFormat),
  endDate: moment(to).format(dashboardDateFormat),
});

export const getDashboardDateRangeValidationError = (
  from: Date | undefined,
  to: Date | undefined,
  today: Moment = moment(),
): string | undefined => {
  if (!from || !to) {
    return undefined;
  }

  const start = moment(from).startOf('day');
  const end = moment(to).startOf('day');
  const latestDate = today.clone().startOf('day');

  if (!start.isValid() || !end.isValid()) {
    return 'Choose valid start and end dates.';
  }

  if (start.isAfter(latestDate) || end.isAfter(latestDate)) {
    return 'Dates cannot be in the future.';
  }

  if (end.isBefore(start)) {
    return 'The end date must be on or after the start date.';
  }

  if (end.isAfter(start.clone().add(1, 'year'))) {
    return 'The selected range cannot be longer than one year.';
  }

  return undefined;
};
