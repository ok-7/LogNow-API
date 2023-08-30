import { businessService } from "../services/business.service";
import express from 'express';

export const businessController = new class BusinessController {

    constructor() {}

    public async getBusinesses(req: express.Request, res: express.Response) {
        try{
            const businesses = await businessService.getBusinesses();
            return res.status(200).json(businesses);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}