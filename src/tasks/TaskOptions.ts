import { TaskConfig } from './TaskConfig';

export interface TaskOptions {
  config?: TaskConfig;
  description?: string;
  expectedOutput?: string;
  outputFile?: string;
  agent?: string;
}
