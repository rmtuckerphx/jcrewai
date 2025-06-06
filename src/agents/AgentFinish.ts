export class AgentFinish {
  constructor(
    readonly thought: string,
    readonly output: string,
    readonly text: string,
  ){

  }
}