import { type NextFunction, type Request, type Response } from 'express';

type IMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

interface IOptions {
  origin?: string;
  methods?: IMethods[];
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
  credentials?: boolean;
  allowedHeaders?: Record<string, string> | string;
  headers?: Record<string, string> | string;
  exposedHeaders?: Record<string, string> | string;
  maxAge?: string;
}

type IValue = {
  key: string;
  value: string;
} | null;

type IHeaders = Array<{ key: string; value: string }>;

const vary = (res: Response, field: string): void => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  res?.setHeader('Vary', (res?.getHeader('Vary') ?? '') + ', ' + field);
};

const defaults: IOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

function isString(str: any): boolean {
  return typeof str === 'string' || str instanceof String;
}

function isOriginAllowed(origin: string, allowedOrigin: string | string[] | RegExp): boolean {
  if (Array.isArray(allowedOrigin)) {
    return allowedOrigin.some((o: string) => isOriginAllowed(origin, o));
  } else if (isString(allowedOrigin)) {
    return origin === allowedOrigin;
  } else if (allowedOrigin instanceof RegExp) {
    return allowedOrigin.test(origin);
  } else {
    return !!allowedOrigin;
  }
}

function configureOrigin(
  options: IOptions,
  req: Request,
): Array<
  Array<{
    key: string;
    value: any;
  }>
> {
  const requestOrigin = req?.headers?.origin;
  const headers = [];

  if (!options?.origin || options?.origin === '*') {
    headers.push([{ key: 'Access-Control-Allow-Origin', value: '*' }]);
  } else if (isString(options.origin)) {
    headers.push([{ key: 'Access-Control-Allow-Origin', value: options.origin }]);
    headers.push([{ key: 'Vary', value: 'Origin' }]);
  } else {
    const isAllowed = isOriginAllowed(requestOrigin!, options.origin);
    headers.push([{ key: 'Access-Control-Allow-Origin', value: isAllowed ? requestOrigin : false }]);
    headers.push([{ key: 'Vary', value: 'Origin' }]);
  }

  return headers;
}

function configureMethods(options: IOptions): {
  key: string;
  value: string | undefined;
} {
  const methods = Array.isArray(options.methods) ? options.methods.join(',') : options.methods;
  return { key: 'Access-Control-Allow-Methods', value: methods };
}

function configureCredentials(options: IOptions): IValue {
  return options.credentials === true ? { key: 'Access-Control-Allow-Credentials', value: 'true' } : null;
}

function configureAllowedHeaders(
  options: IOptions,
  req: Request,
): Array<
  Array<{
    key: string;
    value: string | Record<string, string>;
  }>
> {
  let allowedHeaders = options?.allowedHeaders ?? options?.headers;
  const headers = [];
  if (!allowedHeaders) {
    allowedHeaders = req.headers['access-control-request-headers']!;
    headers.push([{ key: 'Vary', value: 'Access-Control-Request-Headers' }]);
  } else if (Array.isArray(allowedHeaders)) {
    allowedHeaders = allowedHeaders.join(',');
  }
  if (allowedHeaders?.length) {
    headers.push([{ key: 'Access-Control-Allow-Headers', value: allowedHeaders }]);
  }
  return headers;
}

function configureExposedHeaders(options: IOptions): IValue {
  const headers = options.exposedHeaders;
  if (!headers) {
    return null;
  } else if (Array.isArray(headers)) {
    return { key: 'Access-Control-Expose-Headers', value: headers.join(',') };
  }
  return null;
}

function configureMaxAge(options: IOptions): IValue {
  const maxAge = (typeof options.maxAge === 'number' || options.maxAge) && options.maxAge.toString();
  return maxAge?.length ? { key: 'Access-Control-Max-Age', value: maxAge } : null;
}

function applyHeaders(headers: IHeaders, res: Response): void {
  headers?.forEach(header => {
    if (header) {
      if (Array.isArray(header)) {
        applyHeaders(header, res);
      } else if (header?.key === 'Vary' && header?.value) {
        vary(res, header.value);
      } else if (header?.value) {
        res.setHeader(header.key, header.value);
      }
    }
  });
}

function applyCors(options: IOptions, req: Request, res: Response, next: NextFunction): void {
  const headers: any[] = [];
  const method = req?.method?.toUpperCase() as IMethods;

  if (method === 'OPTIONS') {
    headers.push(configureOrigin(options, req));
    headers.push(configureCredentials(options));
    headers.push(configureMethods(options));
    headers.push(configureAllowedHeaders(options, req));
    headers.push(configureMaxAge(options));
    headers.push(configureExposedHeaders(options));
    applyHeaders(headers as IHeaders, res);

    if (options?.preflightContinue) {
      next();
    } else {
      res.statusCode = options?.optionsSuccessStatus ?? 204;
      res.setHeader('Content-Length', '0');
      res.end();
    }
  } else {
    headers.push(configureOrigin(options, req));
    headers.push(configureCredentials(options));
    headers.push(configureExposedHeaders(options));
    applyHeaders(headers as IHeaders, res);
    next();
  }
}

export function cors(option: IOptions): any {
  const optionsCallback = typeof option === 'function' ? option : (_: Request, cb: (arg0: null, arg1: any) => any) => cb(null, option);
  return function corsMiddleware(req: Request, res: Response, next: NextFunction) {
    optionsCallback(req, (err: unknown, options: IOptions) => {
      if (err) {
        next(err);
      } else {
        const corsOptions: IOptions = { ...defaults, ...options };
        let originCallback = null;

        if (typeof corsOptions?.origin === 'function') {
          originCallback = corsOptions.origin;
        } else if (corsOptions?.origin) {
          originCallback = (__: any, cb: (arg0: null, arg1: any) => any) => cb(null, corsOptions?.origin);
        }

        if (originCallback) {
          originCallback(req?.headers?.origin, (err2: any, origin: string) => {
            if (err2 || !origin) {
              next(err2);
            } else {
              corsOptions.origin = origin;
              applyCors(corsOptions, req, res, next);
            }
          });
        } else {
          next();
        }
      }
    });
  };
}
