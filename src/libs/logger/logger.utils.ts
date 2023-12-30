import { config } from '@app/config';
import { type Format, type TransformableInfo } from 'logform';
import { format } from 'winston';

export interface ConsoleFormatOptions {
  colors?: boolean;
  prettyPrint?: boolean;
}

type Colorizer = (text: string) => string;

const clc = {
  bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  red: (text: string) => `\x1B[31m${text}\x1B[39m`,
  magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
  cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

const colorScheme: Record<string, Colorizer> = {
  info: clc.green,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getValidValues = (context = null) => {
  if (!context) {
    return {
      isValidString: null,
      context: '',
    };
  }

  const isString: boolean = context === 'string';
  if (isString) {
    return {
      isValidString: true,
      context,
    };
  }

  const { status, method, _function, controller } = context || {};
  return {
    isValidString: false,
    code: status ? `[${status}] ` : '',
    method: method ? `[${method}] ` : '',
    _function: _function ? `[${_function}] ` : '',
    controller: controller ? `[${controller}] ` : '',
  };
};

const getFormattedLogs = (appName = 'Node', data: any = null): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const values = getValidValues(data?.context);

  if (data?.context && !values.isValidString) {
    const { code, controller, _function, method } = values;
    return `[${appName}] [${data?.level
      .toUpperCase()
      .padEnd(7)
      .trim()}] - ${data?.timestamp} ${controller}${method}${code}${_function}${data?.message}`;
  } else {
    const context = data?.context ? `[${data?.context}]` : '';
    return `[${appName}] [${data?.level.toUpperCase().padEnd(7).trim()}] - ${data?.timestamp}${context}${data?.message}`;
  }
};

const getContext = (context: null | undefined): string => {
  const values = getValidValues(context);

  if (values?.isValidString === null) {
    return '';
  }

  if (!values?.isValidString) {
    const { code, method, controller, _function } = values;
    return `${clc.yellow(controller!)}${clc.green(code!)}${clc.green(method!)}${clc.green(_function!)}`;
  } else {
    return `${clc.yellow(values.context!)}`;
  }
};

const consoleFormat = (
  appName = 'Node',
  options: ConsoleFormatOptions = {
    colors: !config.app.NO_COLOR,
    prettyPrint: false,
  },
): Format =>
  format.printf((args: TransformableInfo) => {
    const { context, level, message, ms } = args;
    let { timestamp } = args;

    if (timestamp && timestamp === new Date(timestamp as number).toISOString()) {
      timestamp = new Date(timestamp as number).toLocaleString();
    }

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const color = (options.colors && colorScheme[level]) || ((text: string): string => text);
    const yellow = options.colors ? clc.yellow : (text: string): string => text;

    const _appName = color(`[${appName}]`) + ' ';
    const _ms = ms ? ` ${yellow(ms as string)}` : '';
    const _timestamp = timestamp ? `${timestamp} ` : '';
    const _level = `${yellow(level?.charAt(0).toUpperCase() + level?.slice(1))}\t`;

    return (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      _appName + _level.trimEnd() + ' ' + clc.green('-') + ' ' + _timestamp + '' + getContext(context) + '' + `${color(message as string)} - ` + _ms
    );
  });

export const utilities = {
  format: {
    consoleFormat,
    getFormattedLogs,
  },
};
