import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockStatements } from "@/lib/data";
import { DashboardCharts } from "@/components/dashboard/charts";
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
import Image from "next/image";

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
        <DashboardCharts statements={mockStatements} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Geographic Heatmap</CardTitle>
          <CardDescription>State-wise completion data across India.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center bg-muted/50 rounded-lg">
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">India map visualization coming soon.</p>
            <Image src="https://picsum.photos/seed/india-map/600/400" alt="Placeholder for India map" width={600} height={400} className="rounded-lg shadow-md" data-ai-hint="India map" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
