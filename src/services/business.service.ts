import { ObjectId } from "mongodb";
import database from "../database/database";

export const businessService = new class BusinessService {

    constructor() {}

    public async getBusinesses() {
        return database.businessCollection.find().toArray();
    }

    public async getBusiness(id: string) {
        return await database.businessCollection.findOne({ _id: new ObjectId(id) });
    }
}