import { userService } from "../services/user.service";
import express from 'express';

export const userController = new class UserController {

    constructor() {}

    public async getUsers(req: express.Request, res: express.Response) {
        try{
            const users = await userService.getUsers();
            return res.status(200).json(users);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }

    public async getUser(req: express.Request, res: express.Response) {
        try{
            const userId = req.params.id;
            if(!userId) return res.sendStatus(400);

            const user = await userService.getUser(userId);
            if(!user) return res.sendStatus(404);

            return res.status(200).json(user);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}