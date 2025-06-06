import { Crew } from '../Crew';
import { BaseLlm } from '../llms/BaseLlm';
import { formatMessageForLlm, getLlmResponse, processLlmResponse } from '../utilities/agentUtils';
import { AgentFinish } from './AgentFinish';
import { BaseAgent } from './BaseAgent';

export class CrewAgentExecutor {
  messages: Record<string, string>[] = [];

  constructor(
    readonly agent: BaseAgent,
    readonly crew: Crew,
    readonly prompt: any,
    readonly llm: BaseLlm
  ) {
  }

  async invoke(inputs: Record<string, string>): Promise<Record<string, any>> {
    let formattedAnswer;

    if (this.prompt['system']) {
      const systemPrompt = this.formatPrompt(this.prompt['system'] ?? '', inputs);
      const userPrompt = this.formatPrompt(this.prompt['user'] ?? '', inputs);

      this.messages.push(formatMessageForLlm(systemPrompt, 'system'));
      this.messages.push(formatMessageForLlm(userPrompt));
    } else {
      const userPrompt = this.formatPrompt(this.prompt['prompt'] ?? '', inputs);

      this.messages.push(formatMessageForLlm(userPrompt));
    }

    this.showStartLogs();

    try {
      formattedAnswer = await this.invokeLoop();

      return { output: formattedAnswer.output };
    } catch (error) {
      console.error('Agent failed to reach a final answer. This is likely a bug - please report it.');
      throw new Error('Error calling CrewAgentExecutor.invoke');
    }
  }

  private async invokeLoop(): Promise<AgentFinish> {
    let formattedAnswer: any | undefined;

    while (!(formattedAnswer instanceof AgentFinish)) {
      // TODO: Add logic for tools and handle max iterations

      const answer = await getLlmResponse(this.llm, this.messages);
      formattedAnswer = processLlmResponse(answer);
    }

    return formattedAnswer;
  }

  private showStartLogs() {
    const verbose = this.agent.verbose || this.crew.verbose;

    if (verbose) {
      console.log(`== ${this.agent.role} ==\n`);
    }
  }

  private formatPrompt(prompt: string, inputs: Record<string, string>): string {
    prompt = prompt.replaceAll('{input}', inputs['input'] ?? '');
    prompt = prompt.replaceAll('{tool_names}', inputs['tool_names'] ?? '');
    prompt = prompt.replaceAll('{tools}', inputs['tools'] ?? '');

    return prompt;
  }
}