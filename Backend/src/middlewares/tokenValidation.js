import { ObjectId } from 'mongodb';
import db from '../db.js';
import jwt from 'jsonwebtoken';

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send("Token de acesso não fornecido.");
  }

  try {
    const chaveSecreta = process.env.JWT_SECRET;
    const payload = jwt.verify(token, chaveSecreta);

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
      return res.status(401).send("Sessão inválida. Por favor, faça login novamente.");
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(payload.userId) });
    if (!user) {
      return res.status(401).send("Usuário do token não encontrado.");
    }

    delete user.password;
    res.locals.user = user;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Token de acesso inválido ou expirado.");
  }
}