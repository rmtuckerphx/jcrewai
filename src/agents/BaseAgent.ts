import { Crew } from '../Crew';
import { Llm } from '../Llm';
import { BaseLlm } from '../llms/BaseLlm';
import { Task } from '../Task';
import { interpolate } from '../utilities/stringUtils';
import { AgentConfig } from './AgentConfig';
import { AgentOptions } from './AgentOptions';
import { CrewAgentExecutor } from './CrewAgentExecutor';

export abstract class BaseAgent {
  private originalRole?: string;
  private originalGoal?: string;
  private originalBackstory?: string;

  id?: string;
  config?: AgentConfig;
  name?: string;
  crew?: Crew;
  agentExecutor?: CrewAgentExecutor;
  role?: string;
  goal?: string;
  backstory?: string;
  llm?: string | BaseLlm;
  i18n?: any;
  verbose: boolean = false;

  constructor(options: AgentOptions) {
    this.config = options.config;
    this.role = options.role ?? this.config?.role;
    this.goal = options.goal ?? this.config?.goal;
    this.backstory = options.backstory ?? this.config?.backstory;
    this.llm = options.llm ?? this.config?.llm ?? process.env.MODEL;
    this.verbose = options.verbose ?? false;
    // this.i18n = options.i18n;

    if (typeof this.llm === 'string') {
      this.llm = new Llm({ model: this.llm });
    }
  }

  abstract executeTask(task: Task): Promise<string>;

  interpolateInputs(inputs?: Record<string, string>) {
    if (!this.originalRole) {
      this.originalRole = this.role ?? '';
    }

    if (!this.originalGoal) {
      this.originalGoal = this.goal ?? '';
    }

    if (!this.originalBackstory) {
      this.originalBackstory = this.backstory ?? '';
    }

    if (inputs) {
      this.role = interpolate(this.originalRole, inputs);
      this.goal = interpolate(this.originalGoal, inputs);
      this.backstory = interpolate(this.originalBackstory, inputs);
    }
  }
}