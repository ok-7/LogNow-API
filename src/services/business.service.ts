import database from "../database/database";

export const businessService = new class BusinessService {

    constructor() {}

    public async getBusinesses() {
        return database.businessCollection.find().toArray();
    }
}