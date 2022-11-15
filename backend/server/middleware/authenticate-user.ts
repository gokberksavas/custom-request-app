import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { userDb } from '../../prisma/mutations/user_operations';

export default async (email: string, password: string) :Promise<User | boolean> => {
    const salt = await bcrypt.genSalt(12);
    const saltyHash = await bcrypt.hash(password, salt);
    const user = await userDb.getUserByEmail(email);

    if (user) {
      let authenticated = await bcrypt.compare(user.password, saltyHash);

      return authenticated && user;
    }
    
    return false;
};