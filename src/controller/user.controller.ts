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

    public async getUserByTelegramId(req: express.Request, res: express.Response) {
        try{
            const { telegramId } = req.params;
            const user = await userService.getUserByTelegramId(telegramId);
            return res.status(200).json(user);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}