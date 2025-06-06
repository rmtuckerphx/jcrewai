import { AgentConfig } from './AgentConfig';
// import { CrewAgentExecutor } from './CrewAgentExecutor';
// import { Crew } from '../Crew';
import { BaseLlm } from '../llms/BaseLlm';


export interface AgentOptions {
  // name?: string;
  // crew?: Crew;
  // agentExecutor?: CrewAgentExecutor;
  config?: AgentConfig;
  role?: string;
  goal?: string;
  backstory?: string;
  llm?: string | BaseLlm | any;
  verbose?: boolean;

  // i18n?: any;
}
