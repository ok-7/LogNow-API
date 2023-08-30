import { ObjectId } from "mongodb";

export class RoleCollection {
    constructor(
        public _id: ObjectId,

        public name: string,
        public description: string,

        
    ) {

    }
}