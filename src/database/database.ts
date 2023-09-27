import * as mongoDB from "mongodb";
import { UserCollection } from "./collections/user.collection";
import { BusinessCollection } from "./collections/business.collection";
import { RoleCollection } from "./collections/role.collection";
import { ModuleCollection } from "./collections/module.collection";
import { ReportBookLogCollection } from "./collections/reportbook.log.collection";

export default new class Database {
    
    public client: mongoDB.MongoClient | undefined;
    public database: mongoDB.Db | undefined;

    constructor() {
        this.client = undefined;
        this.database = undefined;
    }
    
    public userCollection: mongoDB.Collection<UserCollection>;
    public businessCollection: mongoDB.Collection<BusinessCollection>;
    public roleCollection: mongoDB.Collection<RoleCollection>;
    public moduleCollection: mongoDB.Collection<ModuleCollection>;
    public reportBookLogCollection: mongoDB.Collection<ReportBookLogCollection>;

    public async establishDatabaseConnection() {
        if (this.client) return console.log("Database connection already established.");

        this.client = new mongoDB.MongoClient(
            "mongodb+srv://kreutzer:kreutzer123@amazon.qeer3of.mongodb.net/?retryWrites=true&w=majority"
        );
        
        await this.client.connect().catch((error) => {
            console.log(`Failed to connect to the database. Error: ${error}`);
            process.exit(1);
        });

        this.database = this.client.db("lognow");

        this.userCollection = this.database.collection("users");
        this.businessCollection = this.database.collection("businesses");
        this.roleCollection = this.database.collection("roles");
        this.moduleCollection = this.database.collection("modules");
        this.reportBookLogCollection = this.database.collection("reportbooklogs");

        console.log(`Connection to the database ${this.database.namespace} was successfully established.`);
    }
}