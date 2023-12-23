export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
}

type INodeEnv = keyof typeof NodeEnv;

export interface Env {
  APP_NAME: string;
  PORT: number;
  NODE_ENV: INodeEnv;
  BASE_URL: string;
  SWAGGER_URL: string;
}
