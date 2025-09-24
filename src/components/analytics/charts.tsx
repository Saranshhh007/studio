
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
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
    const config: any = {};
    for (const key in analytics.statusDistribution) {
        const name = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
        config[name] = {
            label: name,
            color: analytics.statusDistribution[key].color,
        };
    }
    return config;
  }, [analytics]);


  const departmentPerformance = useMemo(() => {
    return analytics.departmentPerformance.sort((a, b) => b.completionRate - a.completionRate);
  }, [analytics]);

  const departmentPerformanceConfig = {
    completionRate: {
      label: "Completion Rate (%)",
      color: "hsl(var(--status-completed))",
    },
  };
  
  const trendsOverTimeConfig = {
    statementsAdded: {
      label: "Statements Added",
      color: "hsl(var(--primary))",
    },
    completed: {
      label: "Statements Completed",
      color: "hsl(var(--status-completed))",
    },
    userGrowth: {
      label: "New Users",
      color: "hsl(var(--accent))",
    },
  };

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
          <ChartContainer config={departmentPerformanceConfig} className="h-[300px] w-full">
            <BarChart data={departmentPerformance} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="department" type="category" width={150} tick={{fontSize: 12}}/>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend />
              <Bar dataKey="completionRate" fill="hsl(var(--status-completed))" name="Completion Rate (%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Trends Over Time</CardTitle>
          <CardDescription>Monthly statements and user growth.</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={trendsOverTimeConfig} className="h-[300px] w-full">
            <BarChart data={analytics.trendsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Bar dataKey="statementsAdded" fill="hsl(var(--primary))" name="Statements Added" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="hsl(var(--status-completed))" name="Statements Completed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="userGrowth" fill="hsl(var(--accent))" name="New Users" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
