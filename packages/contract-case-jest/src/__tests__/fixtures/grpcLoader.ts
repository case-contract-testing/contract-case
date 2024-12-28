import grpc, { loadPackageDefinition } from '@grpc/grpc-js';
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

const loadPackage = (
  protoPath: string,
  packageName: string,
): grpc.GrpcObject => {
  const loadedProto = loadProto(protoPath);
  const loadedPackage = loadedProto[packageName] as grpc.GrpcObject;
  if (loadedPackage == null) {
    throw new Error(
      `The proto file '${protoPath}' doesn't have a package named '${packageName}'`,
    );
  }

  return loadedPackage;
};

export const loadService = (
  protoPath: string,
  packageName: string,
  serviceName: string,
): grpc.ServiceClientConstructor => {
  const servicePackage = loadPackage(protoPath, packageName);
  if (!servicePackage[serviceName]) {
    throw new Error(
      `The package named '${packageName}' doesn't appear to have a service named '${serviceName}'`,
    );
  }
  return servicePackage[serviceName] as grpc.ServiceClientConstructor;
};
