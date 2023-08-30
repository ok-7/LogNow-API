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
}