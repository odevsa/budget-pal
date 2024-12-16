"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionMonthlySummary } from "@/core/models/Report";

const chartConfig = {
  current: {
    label: "Current",
    color: "hsl(var(--chart-1))",
  },
  previous: {
    label: "Previous",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function MonthlySummary({
  data,
}: {
  data: TransactionMonthlySummary[];
}) {
  return (
    <div>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={data.map((d) => ({ ...d, day: d.day.toString() }))}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <defs>
            <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-current)"
                stopOpacity={0.8}
              />
              <stop
                offset="75%"
                stopColor="var(--color-current)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-previous)"
                stopOpacity={0.8}
              />
              <stop
                offset="75%"
                stopColor="var(--color-previous)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="current"
            type="linear"
            fill="url(#fillCurrent)"
            fillOpacity={0.4}
            stroke="var(--color-current)"
          />
          <Area
            dataKey="previous"
            type="linear"
            fill="url(#fillPrevious)"
            fillOpacity={0.4}
            stroke="var(--color-previous)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
