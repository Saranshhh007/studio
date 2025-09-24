"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateReportSummaries, GenerateReportSummariesOutput } from "@/ai/flows/generate-report-summaries";
import { mockStatements } from "@/lib/data";

const ReportFormSchema = z.object({
  template: z.string().min(1, { message: "Please select a template." }),
  outputFormat: z.enum(["PDF", "Markdown", "Text"]),
});

type ReportFormValues = z.infer<typeof ReportFormSchema>;

export function ReportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<GenerateReportSummariesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(ReportFormSchema),
    defaultValues: {
      template: "monthly-accountability",
      outputFormat: "Markdown",
    },
  });

  async function onSubmit(data: ReportFormValues) {
    setIsLoading(true);
    setReport(null);
    try {
      // For this demo, we'll use all mock statements regardless of the template.
      const statementDetails = mockStatements.map(s => ({
        id: s.id,
        title: s.title,
        officialName: s.official.name,
        ministry: s.official.ministry,
        category: s.category,
        status: s.status,
      }));

      const result = await generateReportSummaries({
        statementDetails,
        outputFormat: data.outputFormat,
      });

      setReport(result);
      toast({
        title: "Report Generated",
        description: "The summary has been successfully created.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the report summary.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate a New Report</CardTitle>
          <CardDescription>Select a template and format to generate a report summary.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Template</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a report template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly-accountability">Monthly Accountability Report</SelectItem>
                        <SelectItem value="ministry-performance">Ministry Performance Review</SelectItem>
                        <SelectItem value="high-priority">High Priority Pending Items</SelectItem>
                        <SelectItem value="public-transparency">Public Transparency Report</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="outputFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an output format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Markdown">Markdown</SelectItem>
                        <SelectItem value="Text">Text</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Summary</CardTitle>
          <CardDescription>The AI-generated report summary will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading ? (
             <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : report ? (
            <Textarea
              readOnly
              value={report.summary}
              className="h-full min-h-[300px] text-sm"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full border-2 border-dashed rounded-lg">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Your report will be shown here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
