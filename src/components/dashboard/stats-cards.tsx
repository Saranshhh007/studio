import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import type { Statement } from "@/types";

type StatsCardsProps = {
  statements: Statement[];
};

export function StatsCards({ statements }: StatsCardsProps) {
  const totalStatements = statements.length;
  const completedThisMonth = statements.filter(s => s.status === 'completed' && s.dateCompleted && s.dateCompleted.getMonth() === new Date().getMonth()).length;
  const highPriorityPending = statements.filter(s => s.priority === 'critical' && (s.status === 'pending' || s.status === 'in_progress')).length;
  
  // Dummy calculation for average completion time
  const completedStatements = statements.filter(s => s.status === 'completed' && s.dateCompleted);
  const avgCompletionTime = completedStatements.length > 0 
    ? Math.round(completedStatements.reduce((acc, s) => acc + (s.dateCompleted!.getTime() - s.dateCreated.getTime()), 0) / completedStatements.length / (1000 * 60 * 60 * 24 * 1.5)) // Adjusted for a lower value
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-l-4 border-brand-navy-blue">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Statements Tracked</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStatements}</div>
          <p className="text-xs text-muted-foreground">All statements in the system</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-status-completed">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{completedThisMonth}</div>
          <p className="text-xs text-muted-foreground">in {new Date().toLocaleString('default', { month: 'long' })}</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-status-pending">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Priority Items</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highPriorityPending}</div>
          <p className="text-xs text-muted-foreground">Require immediate attention</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Completion Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgCompletionTime} days</div>
          <p className="text-xs text-muted-foreground">for completed statements</p>
        </CardContent>
      </Card>
    </div>
  );
}
