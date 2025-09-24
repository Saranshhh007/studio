import { mockStatements } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, AlertTriangle, XCircle, Share2, Edit, PlusCircle, FileText, Bell, AtSign, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Priority, Status, Update } from "@/types";
import { cn } from "@/lib/utils";
import { suggestStatementPriorities } from "@/ai/flows/suggest-statement-priorities";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-status-critical text-white' },
  high: { label: 'High', className: 'bg-orange-500 text-white' },
  medium: { label: 'Medium', className: 'bg-yellow-500 text-black' },
  low: { label: 'Low', className: 'bg-gray-400 text-white' },
};

const statusConfig: Record<Status, { label: string; icon: React.ReactNode; className: string }> = {
  completed: { label: 'Completed', icon: <CheckCircle className="h-4 w-4" />, className: 'text-status-completed' },
  in_progress: { label: 'In Progress', icon: <Clock className="h-4 w-4" />, className: 'text-status-in-progress' },
  pending: { label: 'Pending', icon: <AlertTriangle className="h-4 w-4" />, className: 'text-status-pending' },
  cancelled: { label: 'Cancelled', icon: <XCircle className="h-4 w-4" />, className: 'text-gray-500' },
};

export default async function StatementDetailPage({ params }: { params: { id: string } }) {
  const statement = mockStatements.find(s => s.id === params.id);

  if (!statement) {
    notFound();
  }

  const prioritySuggestion = await suggestStatementPriorities({
    statementAgeDays: Math.floor((new Date().getTime() - statement.dateCreated.getTime()) / (1000 * 60 * 60 * 24)),
    publicEngagementScore: statement.publicEngagement.views + statement.publicEngagement.comments * 10,
    ministryImportance: 8, // dummy value
    deadlineProximityDays: statement.datePromised ? Math.floor((statement.datePromised.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 365,
  });

  const { label: priorityLabel, className: priorityClassName } = priorityConfig[statement.priority];
  const { label: statusLabel, icon: statusIcon, className: statusClassName } = statusConfig[statement.status];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className={cn("text-sm", priorityClassName)}>{priorityLabel}</Badge>
              <div className={cn("flex items-center gap-2 text-sm font-medium", statusClassName)}>
                {statusIcon} {statusLabel}
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-brand-deep-blue border-b-4 border-primary pb-2">{statement.title}</h1>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Promised by: {statement.datePromised.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <span>Category: {statement.category}</span>
            </div>
          </div>
          
          {/* Original Statement */}
          <Card>
            <CardHeader><CardTitle>Original Statement</CardTitle></CardHeader>
            <CardContent className="prose max-w-none text-foreground">
              <p>{statement.content}</p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader><CardTitle>Timeline of Updates</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-6">
                {statement.updates.map((update, index) => (
                  <div key={update.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      {index < statement.updates.length -1 && <div className="w-px h-full bg-border" />}
                    </div>
                    <div>
                      <p className="font-semibold">{update.author}</p>
                      <p className="text-sm text-muted-foreground">{update.content}</p>
                      <time className="text-xs text-muted-foreground">{update.timestamp.toLocaleDateString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</time>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Image src={statement.official.photoUrl} alt={statement.official.name} width={64} height={64} className="rounded-full border-2 border-primary" data-ai-hint="person professional"/>
              <div>
                <CardTitle>{statement.official.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{statement.official.ministry}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
               <div className="flex items-center gap-2"><AtSign className="w-4 h-4 text-muted-foreground"/> <span>{statement.official.name.replace(/\s/g, '.').toLowerCase()}@gov.in</span></div>
               <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground"/> <span>+91-11-2301XXXX</span></div>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>AI Priority Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Based on current data, our AI suggests setting the priority to <strong className="capitalize text-primary">{prioritySuggestion.suggestedPriority}</strong>.</p>
              <p className="text-xs text-muted-foreground mt-2 italic">Reasoning: {prioritySuggestion.reasoning}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="grid gap-2">
              <Button className="bg-primary hover:bg-primary/90"><Edit className="mr-2 h-4 w-4"/>Edit Priority</Button>
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white"><PlusCircle className="mr-2 h-4 w-4"/>Add Update</Button>
              <Button variant="outline"><FileText className="mr-2 h-4 w-4"/>Generate Report</Button>
              <Separator />
              <Button variant="ghost"><Bell className="mr-2 h-4 w-4"/>Subscribe to Updates</Button>
              <Button variant="ghost"><Share2 className="mr-2 h-4 w-4"/>Share Statement</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
