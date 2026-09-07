import { CalendarDays } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, type DateRange, Popover, PopoverContent, PopoverTrigger } from '@my-monorepo/ui';
import {
  getDashboardDateRangeValidationError,
  type DashboardDateSelection,
} from '../hooks/dashboardDateRange';

interface DashboardDatePickerProps {
  value: DashboardDateSelection;
  onChange: (value: DashboardDateSelection) => void;
}

const formatPickerDate = (date: Date) => moment(date).format('MMM D, YYYY');

export default function DashboardDatePicker({ value, onChange }: DashboardDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange>(value);
  const [error, setError] = useState<string>();
  const today = moment().startOf('day');

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    setDraftRange(value);
    setError(undefined);
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    const nextRange = range ?? { from: undefined, to: undefined };
    const from = nextRange.from;
    const to = nextRange.to;

    setDraftRange(nextRange);

    if (!from || !to) {
      setError(undefined);
      return;
    }

    const validationError = getDashboardDateRangeValidationError(from, to, today);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(undefined);
    onChange({ from, to });
    setOpen(false);
  };

  const handleDayDisabled = (date: Date) => {
    if (moment(date).isAfter(today, 'day')) {
      return true;
    }

    if (!draftRange.from || draftRange.to) {
      return false;
    }

    const anchor = moment(draftRange.from);
    return (
      moment(date).isBefore(anchor.clone().subtract(1, 'year'), 'day') ||
      moment(date).isAfter(anchor.clone().add(1, 'year'), 'day')
    );
  };

  const rangeLabel =
    draftRange.from && draftRange.to
      ? `${formatPickerDate(draftRange.from)} - ${formatPickerDate(draftRange.to)}`
      : draftRange.from
        ? `${formatPickerDate(draftRange.from)} - Select end date`
        : 'Select date range';

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="Choose dashboard date range"
          className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-xl border border-blue-100 bg-white/85 px-3.5 py-2 text-left text-sm font-medium text-blue-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          type="button"
        >
          <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-blue-600" />
          <span className="truncate">{rangeLabel}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-w-[calc(100vw-1rem)] overflow-hidden"
        sideOffset={8}
      >
        <Calendar
          className="w-73 max-w-[calc(100vw-2rem)] rounded-xl"
          disabled={handleDayDisabled}
          endMonth={today.toDate()}
          mode="range"
          onSelect={handleRangeSelect}
          selected={draftRange}
        />
        {error ? (
          <p
            className="border-t border-red-100 px-4 py-3 text-xs font-medium text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
