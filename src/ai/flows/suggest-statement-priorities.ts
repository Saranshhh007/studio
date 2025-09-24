'use server';

/**
 * @fileOverview An AI agent that suggests statement priorities based on various factors.
 *
 * - suggestStatementPriorities - A function that suggests statement priorities.
 * - SuggestStatementPrioritiesInput - The input type for the suggestStatementPriorities function.
 * - SuggestStatementPrioritiesOutput - The return type for the suggestStatementPriorities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStatementPrioritiesInputSchema = z.object({
  statementAgeDays: z
    .number()
    .describe('The age of the statement in days.'),
  publicEngagementScore: z
    .number()
    .describe(
      'A score representing the level of public engagement with the statement (e.g., views, comments, bookmarks).'
    ),
  ministryImportance: z
    .number()
    .describe(
      'A numerical value representing the importance of the ministry associated with the statement (higher value indicates higher importance).'
    ),
  deadlineProximityDays: z
    .number()
    .describe(
      'The number of days remaining until the statement deadline (a smaller number indicates a closer deadline).'
    ),
});
export type SuggestStatementPrioritiesInput = z.infer<
  typeof SuggestStatementPrioritiesInputSchema
>;

const SuggestStatementPrioritiesOutputSchema = z.object({
  suggestedPriority: z
    .enum(['critical', 'high', 'medium', 'low'])
    .describe(
      'The suggested priority level for the statement, based on the input factors.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the suggested priority was recommended based on the input factors.'
    ),
});
export type SuggestStatementPrioritiesOutput = z.infer<
  typeof SuggestStatementPrioritiesOutputSchema
>;

export async function suggestStatementPriorities(
  input: SuggestStatementPrioritiesInput
): Promise<SuggestStatementPrioritiesOutput> {
  return suggestStatementPrioritiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStatementPrioritiesPrompt',
  input: {schema: SuggestStatementPrioritiesInputSchema},
  output: {schema: SuggestStatementPrioritiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest a priority level (critical, high, medium, or low) for government statements based on several factors.  Explain your reasoning.  The statement characteristics are as follows:

Statement Age: {{statementAgeDays}} days
Public Engagement Score: {{publicEngagementScore}}
Ministry Importance: {{ministryImportance}}
Deadline Proximity: {{deadlineProximityDays}} days

Considering these factors, what priority level do you suggest and why? Be brief.`,
});

const suggestStatementPrioritiesFlow = ai.defineFlow(
  {
    name: 'suggestStatementPrioritiesFlow',
    inputSchema: SuggestStatementPrioritiesInputSchema,
    outputSchema: SuggestStatementPrioritiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
