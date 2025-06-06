import { OutputFormat } from './OutputFormat';

export class TaskOutput {
  description?: string;
  name?: string;
  expectedOutput?: string;
  summary?: string;
  rawOutput?: string;
  agentName?: string;
  outputFormat?: OutputFormat = OutputFormat.RAW;
}