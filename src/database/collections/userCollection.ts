import { ObjectId } from "mongodb";
import { Role } from "../../utils/roles";

export class UserCollection {
    constructor(
        public _id: ObjectId,

        public name: string,
        public email: string,
        public password: string,
        public telegramId: string,
        
        public role: Role,

        public sellers: string[],
    ) {

    }
}