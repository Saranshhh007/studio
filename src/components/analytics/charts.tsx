"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts"
import type { AnalyticsData } from "@/types";
import { useMemo } from "react";

type ChartsProps = {
  analytics: AnalyticsData;
};

export function AnalyticsCharts({ analytics }: ChartsProps) {

  const statusDistribution = useMemo(() => {
    return Object.entries(analytics.statusDistribution).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
      value: data.count,
      fill: data.color,
    }));
  }, [analytics]);
  
  const statusChartConfig = useMemo(() => {
    return Object.entries(analytics.statusDistribution).reduce((acc, [name, data]) => {
      acc[name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ')] = { label: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '), color: data.color };
      return acc;
    }, {} as any);
  }, [analytics]);


  const departmentPerformance = useMemo(() => {
    return analytics.departmentPerformance.sort((a, b) => b.completionRate - a.completionRate);
  }, [analytics]);

  return (
    <>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Statement Status</CardTitle>
          <CardDescription>Distribution of all statements by status.</CardDescription>
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
          <CardTitle>Ministry Performance</CardTitle>
          <CardDescription>Completion rate by ministry.</CardDescription>
        </CardHeader>
        <CardContent>
           <ResponsiveContainer width="100%" height={300}>
             <BarChart data={departmentPerformance} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" width={150} tick={{fontSize: 12}}/>
                <Tooltip />
                <ChartLegend />
                <Bar dataKey="completionRate" fill="hsl(var(--status-completed))" name="Completion Rate (%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Trends Over Time</CardTitle>
          <CardDescription>Monthly statements and user growth.</CardDescription>
        </CardHeader>
        <CardContent>
           <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.trendsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <ChartLegend />
                <Line type="monotone" dataKey="statementsAdded" stroke="hsl(var(--primary))" name="Statements Added"/>
                <Line type="monotone" dataKey="completed" stroke="hsl(var(--status-completed))" name="Statements Completed"/>
                <Line type="monotone" dataKey="userGrowth" stroke="hsl(var(--accent))" name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
