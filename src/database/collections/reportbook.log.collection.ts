import { ObjectId } from "mongodb";

export class ReportBookLogCollection {
    constructor(
        public _id: ObjectId,

        public date: Date,
        
        public text: string,

        public user: ObjectId,
        public business: ObjectId,
    ) {

    }
}