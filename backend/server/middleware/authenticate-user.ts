import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { userDb } from '../../prisma/db/user';

export default async (email: string, password: string) :Promise<boolean> => {
    const storedCredentials = await userDb.getUserCredentials(email);
    let authenticated = false;
    
    if (storedCredentials) {
      authenticated = await bcrypt.compare(password, storedCredentials.password);
    }
    
    return authenticated;
};