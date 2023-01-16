import { UserNotFoundException } from '../model/CaseConfigurationError';
import type { UserService, UserServiceDependencies } from './types';

export const makeUserService = ({
  userRepository,
}: UserServiceDependencies): UserService => ({
  getUser: (id: string) => {
    const user = userRepository.get(id);
    if (user) return user;
    throw new UserNotFoundException(`Unable to find user '${id}'`);
  },
});
