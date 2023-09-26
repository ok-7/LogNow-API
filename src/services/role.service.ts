import { ObjectId } from "mongodb";
import database from "../database/database";

export const roleService = new class RoleService {

    constructor() {}

    public async getRoles() {
        return database.roleCollection.find().toArray();
    }

    public async getRole(id: string) {
        return await database.roleCollection.findOne({ _id: new ObjectId(id) });
    }
}