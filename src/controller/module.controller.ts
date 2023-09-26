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

    public async getModuleById(req: express.Request, res: express.Response) {
        try{
            const moduleId = req.params.id;
            if(!moduleId) return res.sendStatus(400);

            const module = await moduleService.getModule(moduleId);
            if(!module) return res.sendStatus(404);

            return res.status(200).json(module);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}