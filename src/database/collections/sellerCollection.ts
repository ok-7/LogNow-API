import { ObjectId } from "mongodb";

export class SellerCollection {
    constructor(
        public _id: ObjectId,

        public name: string,
        public sellId: string,
    ) {

    }
}