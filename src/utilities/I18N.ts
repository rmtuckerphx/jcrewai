import { merge } from 'lodash';
import en from '../translations/en.json';

export class I18N {
  private readonly prompts: any;

  constructor(customPrompts?: any) {
    if (customPrompts) {
      this.prompts = merge(en, customPrompts);
    }
  }

  private retrieve(kind: string, key: string): string {
    try {
      return this.prompts[kind][key];
    } catch (error) {
      throw new Error(`Prompt for '${kind}':'${key}' not found.`);
    }
  }

  slice(key: string): string {
    return this.retrieve('slices', key);
  }

  errors(key: string): string {
    return this.retrieve('errors', key);
  }

  tools(key: string): string | Record<string, string> {
    return this.retrieve('tools', key);
  }

}