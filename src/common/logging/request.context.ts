import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  correlationId: string;
  startTime: number;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();
