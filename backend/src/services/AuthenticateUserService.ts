import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email/password is incorrect.');
    }

    /** Verify if password is correct
     * user.password - Crypted password
     * passowrd - Password without encryption
     * */
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email/password is incorrect.');
    }

    // User authenticated
    return {
      user,
    };
  }
}

export default AuthenticateUserService;
