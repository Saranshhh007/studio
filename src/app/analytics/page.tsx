import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyticsData } from "@/lib/data";
import { AnalyticsCharts } from "@/components/analytics/charts";
import {
  File,
  ListFilter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-brand-deep-blue">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Last 30 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last 90 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  This Financial Year
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <AnalyticsCharts analytics={analyticsData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Geographic Data</CardTitle>
          <CardDescription>State-wise completion data across India.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Total Statements</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.districtWiseData.map((district) => (
                <TableRow key={district.district}>
                  <TableCell className="font-medium">{district.district}</TableCell>
                  <TableCell>{district.totalStatements}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{district.completionRate}%</span>
                      <Progress value={district.completionRate} className="w-24 h-2"/>
                    </div>
                  </TableCell>
                  <TableCell>{district.activeUsers}</TableCell>
                  <TableCell>{district.engagement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
