import { ObjectId } from "mongodb";
import database from "../database/database";
import bcrypt from "bcrypt";

export const userService = new class UserService {

    constructor() {}

    public async getUsers() {
        return await database.userCollection.find().toArray();
    }

    public async getUser(id: string) {
        return await database.userCollection.findOne({ _id: new ObjectId(id) });
    }

    public async getUserByUsername(username: string) {
        return await database.userCollection.findOne({name: username});
    }

    public async validatePassword(input: string, password: string) {
        return await bcrypt.compare(input, password);
    }
}