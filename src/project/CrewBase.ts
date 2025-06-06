import { readFileSync } from 'node:fs';
import yaml from 'yaml';
import { Task } from '../Task';
import { Agent } from '../Agent';
import { Crew } from '../Crew';
import { AgentConfig } from '../agents/AgentConfig';
import { TaskConfig } from '../tasks/TaskConfig';
import { BaseLlm } from '../llms/BaseLlm';

export abstract class CrewBase {
  agentsConfigPath?: string;
  tasksConfigPath?: string;
  
  agentsConfig: Record<string, AgentConfig> = {};
  tasksConfig: Record<string, TaskConfig> = {};

  agents: Agent[] = [];
  tasks: Task[] = [];
  crew?: Crew;
  llms: BaseLlm[] = [];

  constructor() {
    this.agentsConfigPath = this.agentsConfigPath ?? './config/agents.yaml';
    this.tasksConfigPath = this.tasksConfigPath ?? './config/tasks.yaml';

    this.loadConfigs();
    this.iterateDecorators();
  }

  private loadConfigs() {
    try {
      const agentsConfig = this.loadConfig(this.agentsConfigPath!);
      this.agentsConfig = agentsConfig;
    } catch (error) {
      console.warn(`Agent config file not found at ${this.agentsConfigPath}. Proceeding with empty agent configurations.`);
    }

    try {
      const tasksConfig = this.loadConfig(this.tasksConfigPath!);
      this.tasksConfig = tasksConfig;
    } catch (error) {
      console.warn(`Task config file not found at ${this.tasksConfigPath}. Proceeding with empty task configurations.`);
    }

  }

  private loadConfig(configPath: string) {
    const file = readFileSync(configPath, 'utf8');
    return yaml.parse(file);
  }

  private iterateDecorators() {
    const agents = this.getDecoratedMethods('agent:methods');
    this.agents = agents;

    const tasks = this.getDecoratedMethods('task:methods');
    this.tasks = tasks;

    const crews = this.getDecoratedMethods('crew:methods');
    this.crew = crews[0];

    const llms = this.getDecoratedMethods('llm:methods');
    this.llms = llms;
  }

  private getDecoratedMethods(metadataKey: string): any[] {
    const list = [];
    const agentMethods: string[] = Reflect.getMetadata(metadataKey, this) || [];
    for (const methodName of agentMethods) {
      if (typeof (this as any)[methodName] === 'function') {

        // execute the method
        const result = (this as any)[methodName]();

        // set the name
        result.name = methodName;
        list.push(result);
      }
    }

    return list;
  }
}