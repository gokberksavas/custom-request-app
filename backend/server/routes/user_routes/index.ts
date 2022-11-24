import { userDb } from "../../../prisma/db/user";
import express from "express";
import authenticateUser from "../../middleware/authenticate-user";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

export const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(12);
  const saltyHash = await bcrypt.hash(user.password, salt);

  user.password = saltyHash;

  const createdUser = await userDb.createUser(user);

  if(createdUser) {
    res.status(200).send(createdUser);
  } else {
    res.status(404).send('Could not create the user!');
  }
});

userRouter.post('/login', async (req, res) => {
  const { password, email } = req.body;
  const authenticated = await authenticateUser(email, password);

  if (authenticated) {
    const user = await userDb.getUser({ email: email });
    const signedJwt = user && jwt.sign({ email: email }, process.env.JWT_KEY!, { expiresIn: '20m'});

    res.status(200).send(Object.assign({ user: user, token: signedJwt}));
  }
  else {
    res.status(404).send({ message: 'Invalid email or password!'});
  }
});