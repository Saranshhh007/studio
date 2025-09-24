'use server';
/**
 * @fileOverview An AI agent that categorizes a new complaint based on a photo and description.
 *
 * - categorizeComplaint - A function that handles the complaint categorization process.
 * - CategorizeComplaintInput - The input type for the categorizeComplaint function.
 * - CategorizeComplaintOutput - The return type for the categorizeComplaint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const CategorizeComplaintInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A brief description of the issue.'),
});
export type CategorizeComplaintInput = z.infer<typeof CategorizeComplaintInputSchema>;

export const CategorizeComplaintOutputSchema = z.object({
  title: z.string().describe('A short, descriptive title for the complaint.'),
  category: z.string().describe('The primary category of the complaint (e.g., Waste Management, Road Maintenance, Water Supply).'),
  department: z.string().describe('The suggested government department to handle the complaint (e.g., Public Works Department, Municipal Corporation).'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).describe('The suggested priority level.'),
  reasoning: z.string().describe('A brief explanation of why the category and department were chosen.'),
});
export type CategorizeComplaintOutput = z.infer<typeof CategorizeComplaintOutputSchema>;


export async function categorizeComplaint(input: CategorizeComplaintInput): Promise<CategorizeComplaintOutput> {
  return categorizeComplaintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeComplaintPrompt',
  input: {schema: CategorizeComplaintInputSchema},
  output: {schema: CategorizeComplaintOutputSchema},
  prompt: `You are an expert AI assistant for a local government's civic issues department. Your task is to analyze a complaint submitted by a citizen, which includes a photo and a description, and categorize it for proper handling.

Based on the image and description, provide a suitable title, category, responsible department, and a priority level.

Available Departments:
- Public Works Department (Roads, Drains, Streetlights)
- Waste Management Department (Garbage collection, Sanitation)
- Water Supply Board (Leaky pipes, Water shortage)
- Parks and Recreation (Park maintenance, Tree felling)
- Health Department (Public health issues, Pest control)
- Traffic Police (Traffic signal issues, illegal parking)

Analyze the following complaint:

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Provide your analysis in the structured output format.`,
});

const categorizeComplaintFlow = ai.defineFlow(
  {
    name: 'categorizeComplaintFlow',
    inputSchema: CategorizeComplaintInputSchema,
    outputSchema: CategorizeComplaintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
