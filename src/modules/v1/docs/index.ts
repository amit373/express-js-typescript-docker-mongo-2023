import swaggerJSDoc from 'swagger-jsdoc';

import { config } from '@app/config';
import { ApiVersions } from '@app/constants';

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'REST API',
    version: '1.0.0',
    description: 'Example docs',
  },
  host: `localhost:${config.app.PORT}`,
  basePath: `${config.app.BASE_URL}/${ApiVersions.V1}`,
  tags: [
    {
      name: 'Health',
      description: '',
    },
    {
      name: 'Auth',
      description: 'API for auth',
    },
    {
      name: 'Users',
      description: 'API for users',
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
  },
  consumes: ['application/json'],
  produces: ['application/json'],
};

const options = {
  swaggerDefinition,
  apis: ['**/*.ts'],
};

export const swaggerSpecsV1: object = swaggerJSDoc(options);
