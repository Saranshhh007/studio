import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Statement, Priority } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const priorityBorderColor: Record<Priority, string> = {
  critical: "border-status-critical",
  high: "border-orange-500",
  medium: "border-yellow-500",
  low: "border-gray-400",
};

export function PriorityQueue({ statements }: { statements: Statement[] }) {
  const priorityStatements = statements
    .filter(s => (s.priority === 'critical' || s.priority === 'high') && s.status !== 'completed')
    .sort((a, b) => {
      if (a.priority === 'critical' && b.priority !== 'critical') return -1;
      if (a.priority !== 'critical' && b.priority === 'critical') return 1;
      return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
    })
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
            <CardTitle>Priority Statements</CardTitle>
            <CardDescription>Critical and high-priority statements requiring action.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1 bg-brand-navy-blue hover:bg-brand-navy-blue/90 text-white">
          <Link href="/statements">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {priorityStatements.map(statement => (
          <div key={statement.id} className={cn("flex items-center gap-4 p-4 rounded-lg border bg-card transition-shadow hover:shadow-md", priorityBorderColor[statement.priority])}>
            <Image 
              src={statement.official.photoUrl} 
              alt={`Photo of ${statement.official.name}`} 
              width={40} 
              height={40} 
              className="rounded-full"
              data-ai-hint="person avatar"
            />
            <div className="grid gap-1 flex-1">
              <Link href={`/statement/${statement.id}`} className="font-semibold hover:underline">
                {statement.title}
              </Link>
              <div>
                <p className="text-sm text-muted-foreground">{statement.official.ministry}</p>
              </div>
            </div>
            <div className="text-sm font-medium capitalize text-right">
              <span className={`px-2 py-1 rounded-full text-xs ${statement.priority === 'critical' ? 'bg-status-critical/10 text-status-critical' : 'bg-orange-500/10 text-orange-600'}`}>
                {statement.priority}
              </span>
            </div>
          </div>
        ))}
         {priorityStatements.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No high-priority statements at the moment.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
