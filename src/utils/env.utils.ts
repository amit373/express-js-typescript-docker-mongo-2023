import { config } from 'dotenv';
import { type Env } from '@app/interfaces';

/**
 * @method loadEnv
 * @returns {void}
 * @description Load environment variables from .env file
 */
export const loadEnv = (): void => {
  const NODE_ENV = (process?.env as unknown as Env)?.NODE_ENV;
  if (isEmpty(NODE_ENV)) {
    throw new Error(`[ENV] ${NODE_ENV} is not set.`);
  }
  config({ path: `.env.${NODE_ENV}` });
};

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
};

/**
 * @method isNull
 * @param {String} value
 * @returns {Boolean} true & false
 * @description this value is isNull Check
 */
export const isNull = (val: null): boolean => val === null;

/**
 * @method isUndefined
 * @param {String} value
 * @returns {Boolean} true & false
 * @description this value is isUndefined Check
 */
export const isUndefined = (obj: any): boolean => typeof obj === 'undefined';

/**
 * @method isNil
 * @param {String} value
 * @returns {Boolean} true & false
 * @description this value is isNil Check
 */
export const isNil = (val: string): boolean => val === '';

/**
 * @method isBoolean
 * @param {String} value
 * @returns {Boolean} true & false
 * @description this value is isBoolean Check
 */
export const isBoolean = (obj: any): boolean => typeof obj === 'boolean';

/**
 * @method getEnv
 * @param {String} value
 * @returns {String} true & false
 * @description this value is getEnv Check
 */
export const getEnv = (
  key: string,
  options: {
    toNumber?: boolean;
    toBool?: boolean;
    toInteger?: boolean;
  } = {
    toBool: false,
    toInteger: false,
    toNumber: false,
  },
): string | number | boolean => {
  const value = process?.env[key] ?? '';
  if (isEmpty(value)) {
    throw new Error(`[ENV] ${key} is not set.`);
  }
  if (options?.toNumber) {
    return toNumber(value);
  }
  if (options?.toInteger) {
    return toInteger(value);
  }
  if (options?.toBool) {
    return toBool(value);
  }
  return value;
};

/**
 * @method getEnvOptional
 * @param {String} value
 * @returns {String} true & false
 * @description this value is getEnvOptional Check
 */
export const getEnvOptional = (key: string): string => process.env[key]!;

/**
 * @method toNumber
 * @param {String} value
 * @returns {Number} true & false
 * @description this value is toNumber Check
 */
export const toNumber = (val: string): number => {
  if (Number.isNaN(Number(val))) {
    return 0;
  }
  return Number(val);
};

/**
 * @method toInteger
 * @param {String | Number} value
 * @returns {Number} true & false
 * @description this value is toInteger Check
 */
export const toInteger = (val: string): number => {
  if (Number.isNaN(Number.parseInt(val, 10))) {
    return 0;
  }
  return Number.parseInt(val, 10);
};

/**
 * @method toBool
 * @param {String} value
 * @returns {Boolean} true & false
 * @description this value is toBool Check
 */
export const toBool = (val: string | boolean): boolean => {
  if (val === true || val === 'true') {
    return true;
  }
  if (val === false || val === 'false') {
    return false;
  }
  throw new Error('Parse failed (boolean string is expected)');
};

/**
 * @method isValidInt
 * @param {String} value
 * @returns {Boolean} true & false
 * @description this value is isValidInt Check
 */
export const isValidInt = (val: string): boolean => toInteger(val) !== 0;
