import { User, PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

const createUser = async (userData:User) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

const getUserByEmail = async (userEmail:User['email']) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
  });

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const userDb = {
  createUser,
  getUserByEmail
};