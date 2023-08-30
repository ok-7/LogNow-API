import { moduleService } from "../services/module.service";
import express from 'express';

export const moduleController = new class ModuleController {

    constructor() {}

    public async getModules(req: express.Request, res: express.Response) {
        try{
            const modules = await moduleService.getModules();
            return res.status(200).json(modules);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}