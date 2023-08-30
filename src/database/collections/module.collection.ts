import { ObjectId } from "mongodb";

export class ModuleCollection {
    constructor(
        public _id: ObjectId,

        public name: string,
        public description: string,

        public role: ObjectId,
    ) {

    }
}