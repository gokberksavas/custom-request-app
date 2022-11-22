import { userDb } from "../../../prisma/db/user";
import express from "express";
import authenticateUser from "../../middleware/authenticate-user";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

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
  const { password, email } = req.body;
  const authenticated = await authenticateUser(email, password);

  if (authenticated) {
    const user = await userDb.getUser({ email: email });
    const signedJwt = jwt.sign({ user }, process.env.JWT_KEY!, { expiresIn: '20m'});

    res.status(200).send(Object.assign({ user: user, token: signedJwt}));
  }
  else {
    res.status(404).send({ message: 'Invalid email or password!'});
  }
});

userRouter.post('/validate-token', async (req, res) => {
  try {
    const { token } = req.body;

    if (jwt.verify(token, process.env.JWT_KEY!)) {
      res.sendStatus(200);
    }
  } catch (err) {
    res.status(403).send({ error: err});
  }
});