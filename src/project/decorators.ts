import 'reflect-metadata';

export function agent(target: any, propertyKey: string) {
    setMetadata('agent:methods', target, propertyKey);
}

export function task(target: any, propertyKey: string) {
    setMetadata('task:methods', target, propertyKey);
}

export function crew(target: any, propertyKey: string) {
    setMetadata('crew:methods', target, propertyKey);
}

export function llm(target: any, propertyKey: string) {
    setMetadata('llm:methods', target, propertyKey);
}

function setMetadata(metadataKey: string, target: any, propertyKey: string) {
    const methods = Reflect.getMetadata(metadataKey, target) ?? [];
    methods.push(propertyKey);
    Reflect.defineMetadata(metadataKey, methods, target);
}
