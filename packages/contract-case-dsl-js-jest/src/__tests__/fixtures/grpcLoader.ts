import grpc, { GrpcObject, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const loadProto = (protoPath: string) => {
  try {
    const packageDefinition = loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    return loadPackageDefinition(packageDefinition);
  } catch (e) {
    throw new Error(`Unable to load proto from: ${protoPath}`, { cause: e });
  }
};

export const loadPackage = (
  protoPath: string,
  packageName: string,
): GrpcObject => {
  const loadedProto = loadProto(protoPath);
  const loadedPackage = loadedProto[packageName] as GrpcObject;
  if (loadedPackage == null) {
    throw new Error(
      `The proto file '${protoPath}' doesn't have a package named '${packageName}'`,
    );
  }

  return loadedPackage;
};

export const loadServiceFromPackage = (
  serviceName: string,
  servicePackage: GrpcObject,
): grpc.ServiceClientConstructor => {
  if (!servicePackage[serviceName]) {
    throw new Error(
      `The loaded package doesn't appear to have a service named '${serviceName}'`,
    );
  }
  return servicePackage[serviceName] as grpc.ServiceClientConstructor;
};
