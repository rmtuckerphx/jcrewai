// import * as fs from 'fs';
import { Task } from './Task';
import { Agent } from './Agent';
import { Process } from './Process';
import { I18N } from './utilities/I18N';

export class Crew {
  taskOutputs: any = [];
  constructor(
    public agents: Agent[],
    public tasks: Task[],
    public process: Process = Process.Sequential,
    public verbose: boolean = false,
    public customPrompts: any = {}
  ) {

  }

  async kickoff(inputs: Record<string, string>): Promise<any> {
    console.log(`Crew.kickoff: ${JSON.stringify(inputs)}`);

    // interpolate inputs
    if (inputs) {
      this.interpolateInputs(inputs);
    }

    const i18n = new I18N(this.customPrompts ?? {});

    // loop through all agents to set i18n, crew, knowledge, function_calling_llm, step_callback, agent_executor
    for (const agent of this.agents) {
      agent.i18n = i18n;
      agent.crew = this;
      agent.createAgentExecutor();
    }

    // run sequential process
    if (this.process === Process.Sequential) {
      await this.runSequentialProcess();
    }

    // TODO: Handle Process.Hierarchical
  }

  private interpolateInputs(inputs: Record<string, string>) {
    for (const task of this.tasks) {
      task.interpolateInputs(inputs);
    }

    for (const agent of this.agents) {
      agent.interpolateInputs(inputs);
    }
  }

  async runSequentialProcess() {
    await this.executeTasks(this.tasks);
  }

  private async executeTasks(tasks: Task[]) {
    for (const task of tasks) {
      const agent = this.getAgent(task);

      if (agent) {
        const taskOutput = await task.execute(agent);
        this.taskOutputs.push(taskOutput);
      } else {
        throw new Error(`No agent available for task: ${task.description}. Ensure that either the task has an assigned agent or a manager agent is provided.`);
      }
    }
  }

  private getAgent(task: Task) {
    return this.agents.find(agent => agent.name === task.agent);
  }

  test() {
    console.log('Crew.test');
  }
}