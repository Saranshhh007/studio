import { mockStatements } from "@/lib/data"
import { columns } from "./columns"
import { DataTable } from "./data-table"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default async function StatementsPage() {
  const data = mockStatements
  const activeData = data.filter(s => s.classification.status === "in_progress");
  const completedData = data.filter(s => s.classification.status === "completed");
  const pendingData = data.filter(s => s.classification.status === "pending");
  const criticalData = data.filter(s => s.classification.priority === "critical");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight text-brand-deep-blue">Statements Management</h1>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending" className="hidden sm:flex">
              Pending
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
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
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Archived
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
        <TabsContent value="all">
           <DataTable columns={columns} data={data} />
        </TabsContent>
         <TabsContent value="critical">
           <DataTable columns={columns} data={criticalData} />
        </TabsContent>
        <TabsContent value="active">
           <DataTable columns={columns} data={activeData} />
        </TabsContent>
        <TabsContent value="completed">
           <DataTable columns={columns} data={completedData} />
        </TabsContent>
        <TabsContent value="pending">
           <DataTable columns={columns} data={pendingData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
