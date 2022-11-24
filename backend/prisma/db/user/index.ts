import { User } from '@prisma/client';
import prisma from '../initialize-prisma';

const createUser = async (userData:User) :Promise<Partial<User>> => {
  const user = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      email: true,
      full_name: true,
      role: true,
    }
  });

  return user;
};

const getUserCredentials = async (userEmail: string) :Promise<{ email: string, password: string } | null>  => {
  const userCredentials = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    select: {
      email: true,
      password: true
    }
  });

  return userCredentials;
};

const getUser = async (identifiers: { email?: string, password?: string }) :Promise<Partial<User> | null>=> {
  const user = await prisma.user.findUnique({
    where: identifiers,
    select: {
      id: true,
      email: true,
      full_name: true,
      role: true,
    }
  });

  return user;
}

export const userDb = {
  createUser,
  getUserCredentials,
  getUser,
};