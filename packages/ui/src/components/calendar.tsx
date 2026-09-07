import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import {
  DayPicker,
  type ChevronProps,
  type DateRange,
  type DayPickerProps,
} from 'react-day-picker';
import { cn } from '../lib/utils';

const CalendarChevron = ({ orientation, ...props }: ChevronProps) => {
  const Icon =
    orientation === 'left'
      ? ChevronLeft
      : orientation === 'right'
        ? ChevronRight
        : orientation === 'up'
          ? ChevronUp
          : ChevronDown;

  return <Icon {...props} className={cn('size-5', props.className)} />;
};

function Calendar({ className, classNames, components, ...props }: DayPickerProps) {
  return (
    <DayPicker
      className={cn('relative p-4', className)}
      classNames={{
        months: 'flex w-full flex-col gap-4 sm:flex-row',
        month: 'mx-auto w-full space-y-4',
        month_caption: 'relative flex items-center justify-center pt-1',
        caption_label: 'text-sm font-semibold',
        nav: 'absolute inset-x-4 top-4 z-10 flex items-center justify-between',
        button_previous:
          'inline-flex size-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 aria-disabled:pointer-events-none aria-disabled:opacity-40',
        button_next:
          'inline-flex size-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 aria-disabled:pointer-events-none aria-disabled:opacity-40',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex w-full',
        weekday: 'flex-1 rounded-md text-center text-[0.7rem] font-medium uppercase text-slate-400',
        week: 'mt-1 flex w-full',
        day: 'relative flex-1 p-0 text-center text-sm',
        day_button:
          'mx-auto inline-flex size-9 items-center justify-center rounded-md p-0 font-normal outline-none transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500 aria-selected:font-semibold',
        selected: 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white',
        range_start: 'rounded-l-md bg-blue-100 text-blue-700',
        range_end: 'rounded-r-md bg-blue-600 text-white',
        range_middle: 'rounded-none bg-blue-50 text-blue-700',
        today: 'font-semibold text-blue-700',
        outside: 'text-slate-300 opacity-60',
        disabled: 'pointer-events-none text-slate-300 opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{ Chevron: CalendarChevron, ...components }}
      {...props}
    />
  );
}

export { Calendar };
export type { DateRange };
