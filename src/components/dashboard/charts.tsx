
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Pie, PieChart, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartData } from "@/types";
import { useMemo } from "react";

type ChartsProps = {
  chartData: ChartData;
};

export function DashboardCharts({ chartData }: ChartsProps) {

  const statusDistribution = useMemo(() => {
    return chartData.statementsByCategory.map(item => ({
      name: item.category,
      value: item.count,
      fill: item.color,
    }));
  }, [chartData]);
  
  const statusChartConfig = useMemo(() => {
    return chartData.statementsByCategory.reduce((acc, item) => {
      acc[item.category] = { label: item.category, color: item.color };
      return acc;
    }, {} as any);
  }, [chartData]);


  return (
    <>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Statements by Category</CardTitle>
          <CardDescription>Overview of all statement categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={statusChartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={statusDistribution}
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
           <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.completionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <ChartLegend />
                <Line type="monotone" dataKey="completed" stroke="hsl(var(--status-completed))" activeDot={{ r: 8 }} name="Completed"/>
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" name="Total"/>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
