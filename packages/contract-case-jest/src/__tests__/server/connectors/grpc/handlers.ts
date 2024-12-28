import { handleUnaryCall } from '@grpc/grpc-js';
import { Dependencies } from '../../domain/types.js';

type UserRequest = {
  id: string;
};

type UserResponse = {
  username: string;
  first_name: string;
  last_name: string;
  id: string;
};

export const GetUser =
  (deps: Dependencies): handleUnaryCall<UserRequest, UserResponse> =>
  (call, callback) => {
    // eslint-disable-next-line no-console
    console.log(call.request);

    const user = deps.userRepository.get(call.request.id);

    if (user == null) {
      callback(new Error('User not found'));
      return;
    }

    callback(null, {
      id: user.userId,
      username: user.name,
      first_name: '',
      last_name: '',
    });
  };
