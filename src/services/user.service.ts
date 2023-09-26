import { ObjectId } from "mongodb";
import database from "../database/database";
import bcrypt from "bcrypt";
import { UserCollection } from "../database/collections/user.collection";

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

    public async updateUsername(id: string, username: string) {
        const user = await this.getUser(id);
        if(!user) return undefined;

        user.name = username;
        return await database.userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
    }

    public async updatePassword(id: string, password: string) {
        const user = await this.getUser(id);
        if(!user) return undefined;

        user.password = bcrypt.hash(password, 10);
        return await database.userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
    }

    public async addRole(id: string, roleId: string) {
        const user = await this.getUser(id);
        if(!user) return undefined;

        user.roles.push(new ObjectId(roleId));
        return await database.userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
    }
    
    public async removeRole(id: string, roleId: string) {
        const user = await this.getUser(id);
        if(!user) return undefined;

        user.roles = user.roles.filter(role => role.toString() !== roleId);
        return await database.userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
    }

    public async createUser(username: string, email: string, password: string) {
        return await database.userCollection.insertOne(new UserCollection(
            new ObjectId(),
            username,
            email,
            password,
            undefined,
            []
        ));
    }

    public async deleteUser(id: string) {
        return await database.userCollection.deleteOne({ _id: new ObjectId(id) });
    }
}