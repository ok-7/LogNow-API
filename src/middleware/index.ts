import express from 'express';

export const middleware = new class Middleware {

    constructor() {}

    // TODO: better authentication
    public async isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction){
      try {
        const sessionToken = req.cookies['AUTH'];
        if (!sessionToken) return res.sendStatus(403);

        return next();
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
    }
}