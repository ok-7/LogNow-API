import { ObjectId } from "mongodb";
import database from "../database/database";

export const moduleService = new class ModuleService {

    constructor() {}

    public async getModules() {
        return database.moduleCollection.find().toArray();
    }

    public async getModule(id: string) {
        return await database.moduleCollection.findOne({ _id: new ObjectId(id) });
    }
}