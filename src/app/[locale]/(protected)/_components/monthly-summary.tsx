"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  current: {
    label: "Current",
    color: "hsl(var(--chart-2))",
  },
  previous: {
    label: "Previous",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface MonthlySummaryItem {
  day: string;
  current: number;
  previous: number;
}

export function MonthlySummary({ data }: { data: MonthlySummaryItem[] }) {
  return (
    <div>
      <ChartContainer config={chartConfig}>
        <AreaChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
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