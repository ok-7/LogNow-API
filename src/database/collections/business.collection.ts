import { ObjectId } from "mongodb";

export class BusinessCollection {
    constructor(
        public _id: ObjectId,

        public name: string,

        public modules: ObjectId[],

    ) {

    }
}