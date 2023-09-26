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

    public async getBusinessById(req: express.Request, res: express.Response) {
        try{
            const businessId = req.params.id;
            if(!businessId) return res.sendStatus(400);

            const business = await businessService.getBusiness(businessId);
            if(!business) return res.sendStatus(404);

            return res.status(200).json(business);
        }catch(err){
            console.log(err);
            return res.sendStatus(400);
        }
    }
}