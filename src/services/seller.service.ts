import { ObjectId } from "mongodb";
import database from "../database/database";
import { SellerCollection } from "../database/collections/sellerCollection";

export const sellerService = new class SellerService {

    constructor() {}

    public async getSellers() {
        return database.sellerCollection.find().toArray();
    }

    public async getSeller(id: string) {
        const sellers = await this.getSellers();
        return sellers.find((product) => product._id.toString() === id);
    }

    public async getSellerById(sellerId: string) {
        const sellers = await this.getSellers();
        return sellers.find((seller) => seller.sellId === sellerId);
    }

    public async addSeller(seller: SellerCollection) {
        await database.sellerCollection.insertOne(seller);
        return seller;
    }

    public async removeSeller(id: string) {
        await database.sellerCollection.deleteOne({ _id: new ObjectId(id) });
    }

    public async existsSeller(sellerId: string): Promise<boolean> {
        const sellers = await this.getSellers();
        return sellers.some((seller) => seller.sellId === sellerId);
    }
}