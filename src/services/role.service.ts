import database from "../database/database";

export const roleService = new class RoleService {

    constructor() {}

    public async getRoles() {
        return database.roleCollection.find().toArray();
    }
}