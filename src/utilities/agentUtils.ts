import { AgentAction } from '../agents/AgentAction';
import { AgentFinish } from '../agents/AgentFinish';
import { BaseLlm } from '../llms/BaseLlm';

export function formatMessageForLlm(prompt: string, role: string = 'user') {
  return {
    role,
    content: prompt.trimEnd()
  }
}

export async function getLlmResponse(
  llm: BaseLlm,
  messages: Record<string, string>[],  
) {
  let answer: string | undefined;
  
  try {
    // TODO: Add handling of callback
    answer = await llm.call(messages);
  } catch (error) {
    console.log(`Error during LLM call: ${error}`)
  }

  if (!answer) {
    throw new Error('Invalid response from LLM call - None or empty.');
  }

  return answer;
}

export function processLlmResponse(
  answer: string
): AgentAction | AgentFinish {
  // TODO: parse out values
  return new AgentFinish('testing', answer, answer);
}