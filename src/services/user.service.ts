import database from "../database/database";

export const userService = new class UserService {

    constructor() {}

    public async getUsers() {
        return database.userCollection.find().toArray();
    }
}