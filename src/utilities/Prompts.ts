import { BaseAgent } from '../agents/BaseAgent';
import { I18N } from './I18N';

export class Prompts {
  constructor(
    readonly agent: BaseAgent,
    readonly i18n: I18N,
    readonly hasTools: boolean = false
  ) {}

  taskExecution(): Record<string, string> {
    const slices = ['role_playing'];

    if (this.hasTools) {
      slices.push('tools');
    } else {
      slices.push('no_tools');
    }

    const system = this.buildPrompt(slices);
    slices.push('task');

    return {
      system: system,
      user: this.buildPrompt(['task']),
      prompt: this.buildPrompt(slices)
    };
  }

  private buildPrompt(components: string[]): string {
    const promptParts: string[] = [];

    for (const component of components) {
      promptParts.push(this.i18n!.slice(component))
    }

    let prompt = promptParts.join('');

    prompt = prompt.replaceAll('{role}', this.agent.role!);
    prompt = prompt.replaceAll('{goal}', this.agent.goal!);
    prompt = prompt.replaceAll('{backstory}', this.agent.backstory!);

    return prompt;
  }
}