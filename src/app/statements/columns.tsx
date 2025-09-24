"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpDown, MoreHorizontal, CheckCircle, Clock, AlertTriangle, XCircle, Shield } from "lucide-react"

import { Statement, Priority, Status } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const priorityConfig: Record<Priority, { label: string; icon: React.ReactNode; className: string }> = {
  critical: { label: 'Critical', icon: <AlertTriangle className="h-3 w-3" />, className: 'bg-status-critical/10 text-status-critical border-status-critical/20' },
  high: { label: 'High', icon: <ArrowUpDown className="h-3 w-3 -rotate-45" />, className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  medium: { label: 'Medium', icon: <Clock className="h-3 w-3" />, className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  low: { label: 'Low', icon: <ArrowUpDown className="h-3 w-3 rotate-45" />, className: 'bg-gray-400/10 text-gray-500 border-gray-400/20' },
};

const statusConfig: Record<Status, { label: string; labelHindi: string; className: string; icon: React.ReactNode }> = {
    completed: { label: 'Completed', labelHindi: 'पूर्ण', className: 'bg-status-completed/10 text-status-completed border-status-completed/20', icon: <CheckCircle className="w-3 h-3" /> },
    in_progress: { label: 'In Progress', labelHindi: 'प्रगतिशील', className: 'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20', icon: <Clock className="w-3 h-3" /> },
    pending: { label: 'Pending', labelHindi: 'लंबित', className: 'bg-status-pending/10 text-status-pending border-status-pending/20', icon: <AlertTriangle className="w-3 h-3" /> },
    cancelled: { label: 'Cancelled', labelHindi: 'रद्द', className: 'bg-gray-400/10 text-gray-500 border-gray-400/20', icon: <XCircle className="w-3 h-3" /> },
    on_hold: { label: 'On Hold', labelHindi: 'रोका गया', className: 'bg-gray-400/10 text-gray-500 border-gray-400/20', icon: <Clock className="w-3 h-3" /> },
};


export const columns: ColumnDef<Statement>[] = [
  {
    accessorKey: "classification.priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const priority = row.original.classification.priority
      const config = priorityConfig[priority]
      return <Badge variant="outline" className={cn("capitalize gap-1.5", config.className)}>{config.icon} {config.label}</Badge>
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Statement Title",
    cell: ({ row }) => {
      return (
        <Link href={`/statement/${row.original.id}`} className="font-medium hover:underline">
          {row.getValue("title")}
        </Link>
      )
    },
  },
  {
    accessorKey: "official",
    header: "Official",
    cell: ({ row }) => {
      const official = row.original.official
      return (
        <div className="flex items-center gap-2">
          <Image src={official.photoUrl} alt={official.name} width={28} height={28} className="rounded-full" data-ai-hint="person avatar"/>
          <div>
            <div className="font-medium">{official.name}</div>
            <div className="text-xs text-muted-foreground">{official.ministry}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "classification.category",
    header: "Category",
  },
  {
    accessorKey: "timeline.dateCreated",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.timeline.dateCreated)
      return <div>{date.toLocaleDateString("en-IN")}</div>
    },
  },
  {
    accessorKey: "classification.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.classification.status
      const config = statusConfig[status]
      return <Badge variant="outline" className={cn("capitalize gap-1.5", config.className)}>{config.icon} {config.label}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const statement = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/statement/${statement.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Add Update</DropdownMenuItem>
            <DropdownMenuItem>Change Priority</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
