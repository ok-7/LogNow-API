import database from "../database/database";
import { UserCollection } from "../database/collections/userCollection";
import { SellerCollection } from "../database/collections/sellerCollection";

export const userService = new class UserService {

    constructor() {}

    public async getUsers() {
        return database.userCollection.find().toArray();
    }

    public async addSellerToUser(user: UserCollection, seller: SellerCollection) {
        if(user.sellers.includes(seller._id.toString())) return false;
        user.sellers.push(seller._id.toString());
        await database.userCollection.updateOne({ _id: user._id }, { $set: { sellers: user.sellers } });
        return true;
    }

    public async removeSellerFromUser(user: UserCollection, seller: SellerCollection) {
        if(!user.sellers.includes(seller._id.toString())) return false;
        user.sellers = user.sellers.filter((id) => id !== seller._id.toString());
        await database.userCollection.updateOne({ _id: user._id }, { $set: { sellers: user.sellers } });
        return true;
    }

    public async hasOtherUserSeller(seller: SellerCollection) {
        const users = await this.getUsers();
        return users.some((user) => user.sellers.includes(seller._id.toString()));
    }

    public async getUserByTelegramId(telegramId: string) {
        const users = await this.getUsers();
        return users.find((user) => user.telegramId == telegramId);
    }
}