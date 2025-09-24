import { config } from 'dotenv';
config();

import '@/ai/flows/generate-report-summaries.ts';
import '@/ai/flows/suggest-statement-priorities.ts';
import '@/ai/flows/categorize-complaint.ts';
