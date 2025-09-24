
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Pie, PieChart, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartData } from "@/types";
import { useMemo } from "react";

type ChartsProps = {
  chartData: ChartData;
  statements: any[];
};

export function DashboardCharts({ chartData }: ChartsProps) {

  const categoryDistribution = useMemo(() => {
    return chartData.statementsByCategory.map(item => ({
      name: item.category,
      value: item.count,
      fill: item.color,
    }));
  }, [chartData]);
  
  const categoryChartConfig = useMemo(() => {
    return chartData.statementsByCategory.reduce((acc, item) => {
      acc[item.category] = { label: item.category, color: item.color };
      return acc;
    }, {} as any);
  }, [chartData]);
  
  const completionTrendsConfig = {
      completed: {
        label: "Completed",
        color: "hsl(var(--status-completed))",
      },
      total: {
        label: "Total",
        color: "hsl(var(--primary))",
      },
    };


  return (
    <>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Statements by Category</CardTitle>
          <CardDescription>Overview of all statement categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={categoryChartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={categoryDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Completion Trends</CardTitle>
          <CardDescription>Monthly statement completion rate.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={completionTrendsConfig} className="h-[300px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData?.completionTrends}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="completed"
                type="natural"
                stroke="hsl(var(--status-completed))"
                strokeWidth={2}
                dot={false}
              />
               <Line
                dataKey="total"
                type="natural"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
