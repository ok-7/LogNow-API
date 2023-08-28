import * as mongoDB from "mongodb";
import { SellerCollection } from "./collections/sellerCollection";
import { UserCollection } from "./collections/userCollection";

export default new class Database {
    
    public client: mongoDB.MongoClient | undefined;
    public database: mongoDB.Db | undefined;

    constructor() {
        this.client = undefined;
        this.database = undefined;
    }
    
    public sellerCollection: mongoDB.Collection<SellerCollection>;
    public userCollection: mongoDB.Collection<UserCollection>;

    public async establishDatabaseConnection() {
        if (this.client) return console.log("Database connection already established.");

        this.client = new mongoDB.MongoClient(
            "mongodb+srv://kreutzer:kreutzer123@amazon.qeer3of.mongodb.net/?retryWrites=true&w=majority"
        );
        
        await this.client.connect().catch((error) => {
            console.log(`Failed to connect to the database. Error: ${error}`);
            process.exit(1);
        });

        this.database = this.client.db("amazon");

        this.sellerCollection = this.database.collection("sellers");
        this.userCollection = this.database.collection("users");

        console.log(`Connection to the database ${this.database.namespace} was successfully established.`);
    }
}