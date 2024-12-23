import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './src/__tests__/client/grpc/client_example.proto';

const USER_ID = 'SOME_ID';

const PACKAGE_NAME = 'client_example';
const SERVICE_NAME = 'UserService';
const loadProto = (protoPath: string) => {
  try {
    const packageDefinition = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    return grpc.loadPackageDefinition(packageDefinition);
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

const loadService = (
  protoPath: string,
  packageName: string,
  serviceName: string,
) => {
  const servicePackage = loadPackage(protoPath, packageName);
  if (!servicePackage[serviceName]) {
    throw new Error(
      `The package named '${packageName}' doesn't appear to have a service named '${serviceName}'`,
    );
  }
  return servicePackage[serviceName] as grpc.ServiceClientConstructor;
};

const main = () => {
  const target = 'localhost:50051';

  const serviceName = SERVICE_NAME;
  const methodName = 'getUser';

  const ExampleService = loadService(PROTO_PATH, PACKAGE_NAME, serviceName);

  const client = new ExampleService(target, grpc.credentials.createInsecure());
  console.log(client);

  if (!client[methodName]) {
    throw new Error(
      `The service named '${serviceName}' doesn't appear to have a method named '${methodName}'`,
    );
  }

  client[methodName]({ id: USER_ID }, (err: Error, response: unknown) => {
    if (err) {
      throw new Error(`Server failed with: ${err}`);
    }
    // eslint-disable-next-line no-console
    console.log('User:', response);
  });
};

main();
