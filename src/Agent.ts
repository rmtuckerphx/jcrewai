import { AgentOptions } from './agents/AgentOptions';
import { BaseAgent } from './agents/BaseAgent';
import { CrewAgentExecutor } from './agents/CrewAgentExecutor';
import { BaseLlm } from './llms/BaseLlm';
import { Task } from './Task';
import { Prompts } from './utilities/Prompts';

export class Agent extends BaseAgent {
  constructor(options: AgentOptions) {
    super(options);
  }

  createAgentExecutor() {
    const prompt = new Prompts(this, this.i18n).taskExecution();

    this.agentExecutor = new CrewAgentExecutor(this, this.crew!, prompt, this.llm as BaseLlm);
  }

  async executeTask(task: Task): Promise<string> {
    console.log(`Agent, ${this.name}, executing task '${task.name}'`);

    const taskPrompt = task.prompt();

    //TESTING ONLY
    // (this.llm as BaseLlm).call();

    if (this.agentExecutor) {
      const result = await this.agentExecutor.invoke({
        input: taskPrompt
      });
      return result['output'];
    }

    throw new Error('Agent Executor is not set. Unable to execute task.')
  }
}