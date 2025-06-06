import { Agent } from './Agent';
import { BaseTask } from './tasks/BaseTask';
import { TaskOptions } from './tasks/TaskOptions';

export class Task extends BaseTask {
  constructor(options: TaskOptions) {
    super(options);
  }

  prompt(): string {
    let taskSlices = [this.description];
    let output = this.i18n?.slice('expected_output');
    output = output?.replaceAll('{expected_output}', this.expectedOutput ?? '');

    taskSlices.push(output);

    return taskSlices.join('\n');
  }

  async execute(agent: Agent): Promise<string> {
    return await agent.executeTask(this);
  }
}