
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
import type { Statement, ChartData } from "@/types";
import { useMemo } from "react";

type ChartsProps = {
  statements: Statement[];
  chartData?: ChartData;
};

export function DashboardCharts({ statements, chartData }: ChartsProps) {

  const statusDistribution = useMemo(() => {
    if (chartData) {
        return chartData.statementsByCategory.map(item => ({
            name: item.category,
            value: item.count,
            fill: item.color,
        }));
    }
    const counts = statements.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value, fill: `var(--color-${name})` }));
  }, [statements, chartData]);
  
  const statusChartConfig = useMemo(() => {
      if (chartData) {
          return chartData.statementsByCategory.reduce((acc, item) => {
              acc[item.category] = { label: item.category, color: item.color };
              return acc;
          }, {} as any);
      }
      return {
        completed: { label: "Completed", color: "hsl(var(--status-completed))" },
        in_progress: { label: "In Progress", color: "hsl(var(--status-in-progress))" },
        pending: { label: "Pending", color: "hsl(var(--status-pending))" },
        cancelled: { label: "Cancelled", color: "hsl(var(--muted))" },
      }
  }, [chartData]);


  const ministryPerformance = useMemo(() => {
    const ministryData = statements.reduce((acc, s) => {
      const ministry = s.official.ministry;
      if (!acc[ministry]) {
        acc[ministry] = { total: 0, completed: 0 };
      }
      acc[ministry].total += 1;
      if (s.status === 'completed') {
        acc[ministry].completed += 1;
      }
      return acc;
    }, {} as Record<string, { total: number, completed: number }>);

    return Object.entries(ministryData).map(([ministry, data]) => ({
      ministry,
      performance: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
    })).sort((a, b) => b.performance - a.performance);
  }, [statements]);


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
