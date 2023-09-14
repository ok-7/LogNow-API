import express from 'express';
import jwt from 'jsonwebtoken';
import { UserCollection } from '../database/collections/user.collection';

export const middleware = new class Middleware {

    constructor() {}

    public async signUserToken(user: UserCollection) {
      const accessToken = process.env.ACCESS_TOKEN_SECRET as string;
      if(!accessToken) return null;

      return jwt.sign(user, accessToken, { expiresIn: '1h' });
    }

    public async authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction){
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) return res.sendStatus(401);

      const accessToken = process.env.ACCESS_TOKEN_SECRET as string;
      if(!accessToken) return res.sendStatus(401);

      jwt.verify(token, accessToken, (err: any, user: any) => {
        if (err) return res.status(403).send(err.message);
        req.body.user = user;
        next();
      });
    }
}