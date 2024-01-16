/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { type SchemaOptions, type Document } from 'mongoose';

export const transformedSchemaOptions = <T>(options?: SchemaOptions): T => {
  return {
    ...options,
    toJSON: {
      getters: true,
      transform: function (_doc: T & Document, ret: Record<string, any>) {
        ret['id'] = ret['_id'];
        delete ret['_id'];
        delete ret['__v'];
      },
    },
    toObject: { getters: true },
    timestamps: true,
  } as unknown as T;
};
