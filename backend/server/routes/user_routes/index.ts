import { userDb } from "../../../prisma/db/user";
import express from "express";
import authenticateUser from "../../middleware/authenticate-user";
import bcrypt from 'bcrypt';

export const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(12);
  const saltyHash = await bcrypt.hash(body.password, salt);

  body.password = saltyHash;

  const createdUser = await userDb.createUser(body);

  if(createdUser) {
    res.status(200).send(createdUser);
  } else {
    res.status(404).send('Could not create the user!');
  }
});

userRouter.post('/login', async (req, res) => {
  const body = req.body;
  const authenticated = await authenticateUser(body.email, body.password);

  if (authenticated) {
    const user = await userDb.getUser({ email: body.email });
    
    res.status(200).send(user);
  }
  else {
    res.status(404).send({ message: 'Invalid email or password!'});
  }
});