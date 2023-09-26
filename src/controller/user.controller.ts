import { userService } from "../services/user.service";
import express from 'express';

export const userController = new class UserController {

    constructor() {}

    public async createUser(req: express.Request, res: express.Response) {
        try {
            const username = req.body.username;
            if(!username) return res.status(400).send("username is missing.");

            const email = req.body.email;
            if(!username) return res.status(400).send("email is missing.");

            const password = req.body.password;
            if(!password) return res.status(400).send("password is missing.");
    
            const user = await userService.createUser(username, email, password);
            if(!user) return res.status(500).send("Failed to create account.");

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    public async updateUsername(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.id;
            if(!userId) return res.status(400).send("userId is missing.");

            const username = req.body.username;
            if(!username) return res.status(400).send("username is missing.");

            const user = await userService.updateUsername(userId, username);
            if(!user) return res.status(500).send("Failed to update username.");

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }
            
    public async updatePassword(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.id;
            if(!userId) return res.status(400).send("userId is missing.");

            const password = req.body.password;
            if(!password) return res.status(400).send("password is missing.");

            const user = await userService.updatePassword(userId, password);
            if(!user) return res.status(500).send("Failed to update password.");

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    public async addRole(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.id;
            if(!userId) return res.status(400).send("userId is missing.");

            const roleId = req.body.roleId;
            if(!roleId) return res.status(400).send("roleId is missing.");

            const user = await userService.addRole(userId, roleId);
            if(!user) return res.status(500).send("Failed to update role.");

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    public async removeRole(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.id;
            if(!userId) return res.status(400).send("userId is missing.");

            const roleId = req.body.roleId;
            if(!roleId) return res.status(400).send("roleId is missing.");

            const user = await userService.removeRole(userId, roleId);
            if(!user) return res.status(500).send("Failed to update role.");

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    public async getUsers(req: express.Request, res: express.Response) {
        try{
            const users = await userService.getUsers();
            return res.status(200).json(users);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }

    public async getUserById(req: express.Request, res: express.Response) {
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

    public async deleteUser(req: express.Request, res: express.Response) {
        try{
            const userId = req.params.id;
            if(!userId) return res.sendStatus(400);

            const user = await userService.deleteUser(userId);
            if(!user) return res.sendStatus(404);

            return res.status(200).json(user);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}