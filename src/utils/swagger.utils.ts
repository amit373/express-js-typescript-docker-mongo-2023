import { type Request, type NextFunction, type Router, type Response } from 'express';
import { type SwaggerDefinition } from 'swagger-jsdoc';
import { serve as swaggerUiServe, setup as swaggerUiSetup } from 'swagger-ui-express';

export const defaultSwaggerConfig = {
  swagger: '2.0',
  info: {
    title: 'NodeJS Application',
    version: '1.0.0',
    description: 'Api documentation',
  },
  basePath: '',
  tags: [],
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

export function setupSwaggerMiddleware(router: Router, swaggerUrl: string, swaggerDefinition: SwaggerDefinition, swaggerDoc: object): void {
  router.use(
    swaggerUrl,
    (req: Request, _: Response, next: NextFunction) => {
      swaggerDefinition.host = req.get('host')!;
      (req as any).swaggerDoc = swaggerDoc;
      next();
    },
    swaggerUiServe,
    swaggerUiSetup(),
  );
}
