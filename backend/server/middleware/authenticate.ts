import bcrypt from 'bcrypt';
import { userDb } from '../../prisma/db/user';

export default async (req: any, res: any, next: any) => {
    const { email, password } = req.body;
    const storedCredentials = await userDb.getUserCredentials(email);
    
    if (!storedCredentials) return res.sendStatus(500);
    
    try {
      await bcrypt.compare(password, storedCredentials.password) && next();
    } catch (err) {
      return res.sendStatus(401)
    }
};