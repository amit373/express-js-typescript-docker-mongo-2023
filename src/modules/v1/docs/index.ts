import swaggerJSDoc from 'swagger-jsdoc';

import { config } from '@app/config';
import { ApiVersions } from '@app/constants';
import { defaultSwaggerConfig } from '@app/utils';

export const swaggerDefinition = {
  ...defaultSwaggerConfig,
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
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['**/*.ts'],
};

// Initialize swagger-jsdoc
export const swaggerSpecsV1: object = swaggerJSDoc(options);
