import { autoInjectable } from 'tsyringe';
import { type Logger } from 'winston';

import { logger } from './logger';

interface IContext {
  controller?: string;
  method?: string;
  status?: number;
  function?: string;
}

@autoInjectable()
export class LoggerService {
  private context?: IContext;
  private readonly _logger: Logger = logger;

  public get logger(): Logger {
    return this._logger;
  }

  public setContext(context: IContext): void {
    this.context = context;
  }

  private log(level: keyof Logger, message: any, context?: IContext, trace?: string): Logger {
    context = context ?? this.context;
    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;
      return this._logger[level](msg as string, { context, stack: [trace], ...meta });
    }
    return this._logger[level](message, { context, stack: [trace] });
  }

  public info(message: any, context?: IContext): Logger {
    return this.log('info', message, context);
  }

  public error(message: any, context?: IContext, trace?: string): Logger {
    return this.log('error', message, context, trace);
  }

  public warn(message: any, context?: IContext): Logger {
    return this.log('warn', message, context);
  }

  public debug?(message: any, context?: IContext): Logger {
    return this.log('debug', message, context);
  }

  public verbose?(message: any, context?: IContext): Logger {
    return this.log('verbose', message, context);
  }
}
