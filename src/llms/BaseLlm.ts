import { LlmOptions } from './LlmOptions';

export abstract class BaseLlm {
  model: string;
  temperature: number;

  constructor(options: LlmOptions = {}) {
    this.model = options.model ?? 'gpt-4';
    this.temperature = options.temperature ?? 0.7;
  }

  abstract call(messages: Record<string, string>[]): Promise<any>;
}