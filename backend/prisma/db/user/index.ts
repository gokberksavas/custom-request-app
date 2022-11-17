import { User, PrismaClient } from '@prisma/client'
import type { Credential, Identifier } from '../db_types';

const prisma = new PrismaClient();

const createUser = async (userData:User) => {
  const user = await prisma.user.create({
    data: userData,
  });

  return user;
};

const getUserCredentials = async (userEmail: string) :Promise<Credential | null>  => {
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

const getUser = async (identifiers: Identifier) :Promise<Partial<User> | boolean>=> {
  const user = await prisma.user.findUnique({
    where: identifiers,
    select: {
      id: true,
      email: true,
      full_name: true,
      role: true,
    }
  });

  return user ? user : false;
}

export const userDb = {
  createUser,
  getUserCredentials,
  getUser,
};