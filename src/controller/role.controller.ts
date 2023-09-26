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

    public async getRoleById(req: express.Request, res: express.Response) {
        try{
            const roleId = req.params.id;
            if(!roleId) return res.sendStatus(400);

            const role = await roleService.getRole(roleId);
            if(!role) return res.sendStatus(404);

            return res.status(200).json(role);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}