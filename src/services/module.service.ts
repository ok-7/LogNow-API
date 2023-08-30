import database from "../database/database";

export const moduleService = new class ModuleService {

    constructor() {}

    public async getModules() {
        return database.moduleCollection.find().toArray();
    }
}