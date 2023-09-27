import express from 'express';
import { reportBookService } from "../services/reportbook.service";
import { ObjectId } from 'mongodb';

export const reportBookController = new class ReportBookController {

    constructor() {}

    public async createLog(req: express.Request, res: express.Response) {
        try {
            const text = req.body.text;
            if(!text) return res.status(400).send("text is missing.");

            const userId = req.body.userId;
            if(!userId) return res.status(400).send("userId is missing.");

            const businessId = req.body.businessId;
            if(!businessId) return res.status(400).send("businessId is missing.");
    
            const log = await reportBookService.createLog(text, new ObjectId(userId), new ObjectId(businessId));
            if(!log) return res.status(500).send("Failed to create account.");

            res.status(200).send(log);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    public async getLogs(req: express.Request, res: express.Response) {
        try{
            const logs = await reportBookService.getLogs();
            return res.status(200).json(logs);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }

    public async updateLogText(req: express.Request, res: express.Response) {
        try {
            const logId = req.params.id;
            if(!logId) return res.status(400).send("logId is missing.");

            const text = req.body.text;
            if(!text) return res.status(400).send("text is missing.");

            const log = await reportBookService.updateLogText(logId, text);
            if(!log) return res.status(500).send("Failed to update log.");

            res.status(200).send(log);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    public async getLogsByUserId(req: express.Request, res: express.Response) {
        try{
            const userId = req.params.id;
            if(!userId) return res.sendStatus(400);

            const logs = await reportBookService.getLogByUserId(userId);
            if(!logs) return res.sendStatus(404);

            return res.status(200).json(logs);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }

    public async deleteLog(req: express.Request, res: express.Response) {
        try{
            const logId = req.params.id;
            if(!logId) return res.sendStatus(400);

            const log = await reportBookService.deleteLog(logId);
            if(!log) return res.sendStatus(404);

            return res.status(200).json(log);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}