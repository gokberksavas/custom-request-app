import { userDb } from "../../../prisma/db/user";
import express from "express";
import authenticate from "../../middleware/authenticate";
import authorize from "../../middleware/authorize";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const userRouter = express.Router();

userRouter.get('/', authorize, async (req, res) => {
  const allUsers = await userDb.getAllUsers();

  res.status(200).send(allUsers);
});

userRouter.post('/register', async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(12);
  const saltyHash = await bcrypt.hash(user.password, salt);

  user.password = saltyHash;

  const createdUser = await userDb.createUser(user);

  if (createdUser) {
    res.status(200).send(createdUser);
  } else {
    res.status(404).send('Could not create the user!');
  }
});

userRouter.post('/login', authenticate, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userDb.getUser({ email: email });
    const accessToken = jwt.sign({ user: user }, process.env.ACCESS_KEY!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userEmail: user?.email }, process.env.REFRESH_KEY!, { expiresIn: '3h' });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 12 * 60 * 60 * 1000,
    });
      
    res.status(200).send({ accessToken });
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_KEY!, async (err: any, decoded: any) => {
      if (err) return res.status(406).send({ message: 'Could not verify refresh token' });

      try {
        const user = await userDb.getUser({ email: decoded.userEmail });
        const accessToken = jwt.sign({ user: user }, process.env.ACCESS_KEY!, { expiresIn: '15m' });

        return res.status(200).send({ accessToken })
      } catch (err) {
        return res.status(400).send(err);
      } 
    });
  }
});
