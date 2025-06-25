import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

export async function signUp(req, res) {
  const user = req.body 

  const userExists = await db.collection('users').findOne({ email: user.email });

  if (userExists) {
    console.log("E-mail já cadastrado!")
    return res.sendStatus(409);
  } else {
    const passwordHash = bcrypt.hashSync(user.password, 10);

    await db.collection('users').insertOne({ ...user, password: passwordHash })
    res.sendStatus(201); 
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const chaveSecreta = process.env.JWT_SECRET;
    const configuracoes = { expiresIn: '5m' }; 

    const payload = { userId: user._id };
    const token = jwt.sign(payload, chaveSecreta, configuracoes);

    await db.collection('sessions').insertOne({ token, userId: user._id });

    res.send(token);
  } else {
    res.sendStatus(401);
  }
}
