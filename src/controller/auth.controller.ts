import c from "config";
import { middleware } from "../middleware";
import { userService } from "../services/user.service";
import express from 'express';

export const authController = new class AuthController {

    constructor() {}
    
    public async authenticate(req: express.Request, res: express.Response) {
        try {
            const username = req.body.username;
            if(!username) return res.status(400).send("Invalid username or password.");

            const user = await userService.getUserByUsername(username);
            if (!user) return res.status(400).send("Invalid username or password.");

            const password = req.body.password;
            if(!password) return res.status(400).send("Invalid username or password.");

            const validPassword = await userService.validatePassword(password, user.password);
            if (!validPassword) return res.status(400).send("Invalid username or password.");
    
            const token = await middleware.signUserToken(user);
            if(!token) return res.status(500).send("Failed to sign token.");

            res.status(200).send(token);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
}