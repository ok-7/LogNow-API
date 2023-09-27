import { ObjectId } from "mongodb";
import database from "../database/database";
import { ReportBookLogCollection } from "../database/collections/reportbook.log.collection";
import { get } from "config";

export const reportBookService = new class ReportBookService {

    constructor() {}

    public async getLogs() {
        return database.reportBookLogCollection.find().toArray();
    }

    public async getLogByUserId(userId: string) {
        return await database.reportBookLogCollection.findOne({ user: new ObjectId(userId) });
    }

    public async getLogById(id: string) {
        return await database.reportBookLogCollection.findOne({ _id: new ObjectId(id) });
    }

    public async createLog(text: string, userId: ObjectId, businessId: ObjectId) {
        return await database.reportBookLogCollection.insertOne(new ReportBookLogCollection(
            new ObjectId(),
            new Date(Date.now()),
            text,
            userId,
            businessId
        ));
    }

    public async deleteLog(id: string) {
        return await database.reportBookLogCollection.deleteOne({ _id: new ObjectId(id) });
    }

    public async updateLogText(id: string, text: string) {
        const log = await this.getLogById(id);
        if(!log) return false;

        log.text = text;
        return await database.reportBookLogCollection.updateOne({ _id: new ObjectId(id) }, { $set: log });
    }
}