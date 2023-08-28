import database from "../database/database";
import { UserCollection } from "../database/collections/userCollection";
import { SellerCollection } from "../database/collections/sellerCollection";
import { userService } from "../services/user.service";

export const userController = new class UserController {

    constructor() {}

    public async getUsers() {
        return await userService.getUsers();
    }
}