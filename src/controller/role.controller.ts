import { roleService } from "../services/role.service";
import express from 'express';

export const roleController = new class RoleController {

    constructor() {}

    public async getRoles(req: express.Request, res: express.Response) {
        try{
            const users = await roleService.getRoles();
            return res.status(200).json(users);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}