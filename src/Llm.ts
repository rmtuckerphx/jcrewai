import { BaseLlm } from './llms/BaseLlm';
import { LlmOptions } from './llms/LlmOptions';

export class Llm extends BaseLlm {
  constructor(options: LlmOptions) {
    super(options);
  }

  async call(messages: Record<string, string>[]) {
    console.log(`Calling LLM ${this.model}`);
  }

}