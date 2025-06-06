export function interpolate(template: string, inputs: Record<string, string>): string {
  const pattern = /\{([A-Za-z_][A-Za-z0-9_\-]*)\}/g;
  return template.replace(pattern, (_, key) => {
    return inputs[key] ?? '';
  });
}