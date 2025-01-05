import { loadProtosWithOptionsSync } from '@grpc/proto-loader/build/src/util.js';
import { Type } from 'protobufjs';

type TypeLookup = {
  lookup: (path: string) => Type;
};

export const createTypeLookup = (protoPath: string): TypeLookup => {
  const internals = loadProtosWithOptionsSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  // eslint-disable-next-line no-console
  console.log('Internal proto: ', internals);

  return {
    lookup: (path: string) => internals.lookupTypeOrEnum(path),
  };
};
