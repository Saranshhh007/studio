// src/ai/flows/generate-report-summaries.ts
'use server';

/**
 * @fileOverview Generates summaries of statements for report generation.
 *
 * - generateReportSummaries - A function that generates summaries of statements.
 * - GenerateReportSummariesInput - The input type for the generateReportSummaries function.
 * - GenerateReportSummariesOutput - The return type for the generateReportSummaries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportSummariesInputSchema = z.object({
  statementDetails: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the statement.'),
      title: z.string().describe('The title of the statement.'),
      officialName: z.string().describe('The name of the official associated with the statement.'),
      ministry: z.string().describe('The ministry responsible for the statement.'),
      category: z.string().describe('The category of the statement.'),
      status: z.string().describe('The current status of the statement.'),
    })
  ).describe('An array of statement details to summarize.'),
  outputFormat: z.enum(['PDF', 'Markdown', 'Text']).describe('The desired output format for the report.'),
});
export type GenerateReportSummariesInput = z.infer<typeof GenerateReportSummariesInputSchema>;

const GenerateReportSummariesOutputSchema = z.object({
  summary: z.string().describe('A summary of the statements in the specified output format.'),
});
export type GenerateReportSummariesOutput = z.infer<typeof GenerateReportSummariesOutputSchema>;

export async function generateReportSummaries(input: GenerateReportSummariesInput): Promise<GenerateReportSummariesOutput> {
  return generateReportSummariesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportSummariesPrompt',
  input: {schema: GenerateReportSummariesInputSchema},
  output: {schema: GenerateReportSummariesOutputSchema},
  prompt: `You are a report generation expert.

  You are provided with a list of statements, and you need to generate a summary in the specified output format.

  Statements:
  {{#each statementDetails}}
  - ID: {{this.id}}, Title: {{this.title}}, Official: {{this.officialName}}, Ministry: {{this.ministry}}, Category: {{this.category}}, Status: {{this.status}}
  {{/each}}

  Output Format: {{{outputFormat}}}

  Summary:`,
});

const generateReportSummariesFlow = ai.defineFlow(
  {
    name: 'generateReportSummariesFlow',
    inputSchema: GenerateReportSummariesInputSchema,
    outputSchema: GenerateReportSummariesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
