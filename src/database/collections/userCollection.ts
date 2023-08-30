import { ObjectId } from "mongodb";

export class UserCollection {
    constructor(
        public _id: ObjectId,

        public name: string,
        public email: string,
        public password: string,

    ) {

    }
}