import swaggerJSDoc from 'swagger-jsdoc';

import { config } from '@app/config';
import { ApiVersions } from '@app/constants';

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'NodeJS Application',
    version: '1.0.0',
    description: 'Api documentation',
  },
  host: `localhost:${config.PORT}`,
  basePath: `${config.BASE_URL}/${ApiVersions.V1}`,
  tags: [
    {
      name: 'Health',
      description: 'API for health',
    },
    {
      name: 'Auth',
      description: 'API for auth',
    },
    {
      name: 'User',
      description: 'API for user',
    },
  ],
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
    apiKey: {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['**/*.ts'],
};

// Initialize swagger-jsdoc
export const swaggerSpecsV1: object = swaggerJSDoc(options);
