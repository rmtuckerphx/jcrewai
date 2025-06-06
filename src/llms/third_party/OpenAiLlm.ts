import { BaseLlm } from '../BaseLlm';
import { OpenAI } from 'openai';

export class OpenAiLlm extends BaseLlm {
  client: OpenAI;

  constructor() {
    super();
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async call(messages: Record<string, string>[]) {
    console.log('OpenAiLlm.call()');

    const response = await this.client.responses.create({
      model: this.model,
      temperature: this.temperature,
      input: messages as any
    });

    console.log(`Response: ${response.output_text}`);
    return response.output_text;
  }  
}