import { ReportForm } from "./report-form";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-deep-blue">Report Generation</h1>
        <p className="text-muted-foreground">
          Create and export summaries of government statements using AI.
        </p>
      </div>
      <ReportForm />
    </div>
  );
}
