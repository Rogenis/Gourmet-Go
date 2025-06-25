import db from '../db.js';

export async function getUser(req, res) {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(404);
  }

  delete user.password;

  res.send(user);
}

export async function getUsers(req, res) {
  const users = await db.collection('users').find().toArray();

  if (!users) {
    return res.sendStatus(404);
  }

  res.send(users);
}