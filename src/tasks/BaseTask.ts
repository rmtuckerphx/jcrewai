import { Agent } from '../Agent';
import { I18N } from '../utilities/I18N';
import { interpolate } from '../utilities/stringUtils';
import { TaskConfig } from './TaskConfig';
import { TaskOptions } from './TaskOptions';

export abstract class BaseTask {
  private originalDescription?: string;
  private originalExpectedOutput?: string;
  private originalOutputFile?: string;

  id?: string;
  config?: TaskConfig;
  name?: string;
  description?: string;
  expectedOutput?: string;
  outputFile?: string;
  agent?: string;
  i18n?: I18N;

  constructor(options: TaskOptions) {
    this.config = options.config;
    this.description = options.description ?? this.config?.description;
    this.expectedOutput = options.expectedOutput ?? this.config?.expected_output;
    this.outputFile = options.outputFile ?? this.config?.output_file;
    this.agent = options.agent ?? this.config?.agent;
    this.i18n = new I18N({});
  }

  abstract execute(agent: Agent): Promise<string>;

  interpolateInputs(inputs?: Record<string, string>) {
    if (!this.originalDescription) {
      this.originalDescription = this.description ?? '';
    }

    if (!this.originalExpectedOutput) {
      this.originalExpectedOutput = this.expectedOutput ?? '';
    }

    if (!this.originalOutputFile) {
      this.originalOutputFile = this.outputFile ?? '';
    }

    if (inputs) {
      this.description = interpolate(this.originalDescription, inputs);
      this.expectedOutput = interpolate(this.originalExpectedOutput, inputs);
      this.outputFile = interpolate(this.originalOutputFile, inputs);
    }
  }

}