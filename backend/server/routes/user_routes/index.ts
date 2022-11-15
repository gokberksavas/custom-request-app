import { User } from "@prisma/client";
import { userDb } from "../../../prisma/mutations/user_operations";
import express from "express";
import authenticateUser from "../../middleware/authenticate-user";

export const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
  const body = req.body;
  const authenticated = await authenticateUser(body.email, body.password);

  if (authenticated) {
    res.status(200).send(authenticated);
  }
  else {
    res.status(404).send('Invalid email or password!');
  }
});