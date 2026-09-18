import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '../lib/utils';

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    color?: string;
  }
>;

interface ChartContextValue {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('Chart components must be used inside ChartContainer.');
  }

  return context;
}

interface ChartContainerProps extends React.ComponentProps<'div'> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}

export function ChartContainer({ id, className, children, config, ...props }: ChartContainerProps) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          'flex min-h-56 w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-slate-400 [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-slate-200 [&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none',
          className,
        )}
        {...props}
      >
        <ChartStyle config={config} id={chartId} />
        <RechartsPrimitive.ResponsiveContainer height="100%" width="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ config, id }: { config: ChartConfig; id: string }) {
  const colorConfig = Object.entries(config).filter(([, item]) => item.color);

  if (colorConfig.length === 0) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart="${id}"] { ${colorConfig
          .map(([key, item]) => `--color-${key}: ${item.color};`)
          .join(' ')} }`,
      }}
    />
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipItem {
  color?: string;
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
}

interface ChartTooltipContentProps {
  active?: boolean;
  label?: React.ReactNode;
  payload?: ChartTooltipItem[];
}

export function ChartTooltipContent({ active, label, payload }: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="grid min-w-32 gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
      {label ? <p className="font-medium text-slate-700">{label}</p> : null}
      <div className="grid gap-1.5">
        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? 'value');
          const itemConfig = config[key];

          return (
            <div className="flex items-center justify-between gap-4" key={key}>
              <span className="flex items-center gap-2 text-slate-500">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color ?? itemConfig?.color }}
                />
                {itemConfig?.label ?? item.name ?? key}
              </span>
              <span className="font-medium tabular-nums text-slate-900">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
