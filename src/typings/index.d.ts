// typings/index.d.ts
import { type NodeEnv } from '@app/interfaces';

// Create a custom type or interface for process.env
interface ProcessEnv {
  NODE_ENV: NodeEnv;
  PORT: string;
  API_KEY: string;
}

// Declare process.env with the custom type
declare global {
  namespace NodeJS {
    interface ProcessEnv extends ProcessEnv {}
  }
}
