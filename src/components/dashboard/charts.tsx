
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { Statement } from "@/types";
import { useMemo } from "react";

type ChartsProps = {
  statements: Statement[];
};

export function DashboardCharts({ statements }: ChartsProps) {

  const statusDistribution = useMemo(() => {
    const counts = statements.reduce((acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value, fill: `var(--color-${name})` }));
  }, [statements]);
  
  const statusChartConfig = {
    completed: { label: "Completed", color: "hsl(var(--status-completed))" },
    in_progress: { label: "In Progress", color: "hsl(var(--status-in-progress))" },
    pending: { label: "Pending", color: "hsl(var(--status-pending))" },
    cancelled: { label: "Cancelled", color: "hsl(var(--muted))" },
  }

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
          <CardTitle>Statement Distribution</CardTitle>
          <CardDescription>Overview of all statement statuses.</CardDescription>
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
            <BarChart data={ministryPerformance} layout="vertical" margin={{ left: 100 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="ministry" 
                type="category" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                width={200}
                />
              <Tooltip
                cursor={{ fill: 'hsl(var(--secondary))' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Ministry
                            </span>
                            <span className="font-bold text-foreground">
                              {payload[0].payload.ministry}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Completion
                            </span>
                            <span className="font-bold">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="performance" layout="vertical" radius={4} fill="hsl(var(--status-completed))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
