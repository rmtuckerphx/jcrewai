export class AgentAction {
  constructor(
    readonly thought: string,
    readonly tool: string,
    readonly toolInput: string,
    readonly text: string,
    readonly result: string,
  ){

  }
}