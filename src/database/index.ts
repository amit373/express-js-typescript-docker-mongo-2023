import mongoose, { type ConnectOptions, STATES, connection } from 'mongoose';
import { config } from '@app/config';

const { DB_HOST, DB_PORT, DB_DATABASE } = config;

const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {},
};

/**
 * @description Construct a new instance of the mongodb database connection object
 * @returns a new instance of the mongodb connection object
 * @returns isConnected to the mongodb database connection
 */
export async function connect(): Promise<unknown> {
  const database = await mongoose.connect(dbConnection.url, dbConnection.options as ConnectOptions);
  return database;
}

/**
 * @description Returns a promise that is resolved when the database is connected and closed successfully.
 * @returns state of the database
 * @returns dbState of the database
 */
export function databaseStatus(): {
  state: string;
  dbState: string;
} {
  return {
    state: connection.readyState === 1 ? 'up' : 'down',
    dbState: STATES[connection.readyState],
  };
}
